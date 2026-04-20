// API utilities for data fetching
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Cache duration (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Bump this string whenever the shape of cached data changes.
// It is appended to every localStorage key, so old keys are simply
// ignored and the browser naturally re-fetches fresh data.
const CACHE_VERSION = 'v2';

function cacheKey(name) {
  return `portfolio-${name}-${CACHE_VERSION}`;
}

function readCache(name) {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(cacheKey(name));
    const ts = localStorage.getItem(`${cacheKey(name)}-timestamp`);
    if (raw && ts && Date.now() - parseInt(ts) < CACHE_DURATION) {
      return JSON.parse(raw);
    }
  } catch {
    // corrupt JSON – ignore
  }
  return null;
}

function writeCache(name, data) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(cacheKey(name), JSON.stringify(data));
    localStorage.setItem(`${cacheKey(name)}-timestamp`, Date.now().toString());
  } catch {
    // storage full or private-mode – ignore
  }
}

async function fetchWithTimeout(url, timeoutMs = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'Cache-Control': 'no-cache' },
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    if (err.name === 'AbortError') {
      throw new Error('Request timed out. Please check your connection.');
    }
    throw err;
  }
}

export async function fetchProjects() {
  const cached = readCache('projects');
  if (cached) return cached;

  const response = await fetchWithTimeout(`${API_BASE_URL}/projects?filter=all`);

  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.status}`);
  }

  const data = await response.json();

  // Transform API data
  const transformedProjects = data.map((project) => ({
    id: project._id,
    title: project.title,
    description: project.description,
    image: project.image,
    technologies: project.techStack || [],
    category: project.techStack?.[0] || 'Project',
    demoUrl: project.live,
    githubUrl: project.github,
    status: 'Completed',
  }));

  writeCache('projects', transformedProjects);
  return transformedProjects;
}

export async function fetchSkills() {
  const cached = readCache('skills');
  if (cached) return cached;

  const response = await fetchWithTimeout(`${API_BASE_URL}/skills`);

  if (!response.ok) {
    throw new Error(`Failed to fetch skills: ${response.status}`);
  }

  const data = await response.json();
  writeCache('skills', data);
  return data;
}

export async function fetchCertifications() {
  const cached = readCache('certifications');
  if (cached) return cached;

  const response = await fetchWithTimeout(`${API_BASE_URL}/certifications`);

  if (!response.ok) {
    throw new Error(`Failed to fetch certifications: ${response.status}`);
  }

  const data = await response.json();
  writeCache('certifications', data);
  return data;
}

// Pre-load function for initial page load
export async function preloadData() {
  const results = await Promise.allSettled([
    fetchProjects(),
    fetchSkills(),
    fetchCertifications(),
  ]);

  return {
    projects: results[0].status === 'fulfilled' ? results[0].value : [],
    skills: results[1].status === 'fulfilled' ? results[1].value : [],
    certifications: results[2].status === 'fulfilled' ? results[2].value : [],
  };
}
