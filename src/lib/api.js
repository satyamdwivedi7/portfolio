// API utilities for data fetching
const API_BASE_URL = 'https://portfolio-api.satyamdwivedi.com.np';

// Cache duration (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

export async function fetchProjects() {
  try {
    // Check for cached data first
    if (typeof window !== 'undefined') {
      const cachedData = localStorage.getItem('portfolio-projects');
      const cacheTimestamp = localStorage.getItem('portfolio-projects-timestamp');
      const now = Date.now();
      
      if (cachedData && cacheTimestamp && (now - parseInt(cacheTimestamp)) < CACHE_DURATION) {
        return JSON.parse(cachedData);
      }
    }
    
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(`${API_BASE_URL}/projects?filter=all`, {
      signal: controller.signal,
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
    
    clearTimeout(timeoutId);
    
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
      status: 'Completed'
    }));
    
    // Cache the transformed data (only in browser)
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-projects', JSON.stringify(transformedProjects));
      localStorage.setItem('portfolio-projects-timestamp', Date.now().toString());
    }
    
    return transformedProjects;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Request timed out. Please check your connection.');
    }
    console.error('Error fetching projects:', err);
    throw err;
  }
}

export async function fetchSkills() {
  try {
    // Check for cached data first
    if (typeof window !== 'undefined') {
      const cachedData = localStorage.getItem('portfolio-skills');
      const cacheTimestamp = localStorage.getItem('portfolio-skills-timestamp');
      const now = Date.now();
      
      if (cachedData && cacheTimestamp && (now - parseInt(cacheTimestamp)) < CACHE_DURATION) {
        return JSON.parse(cachedData);
      }
    }
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(`${API_BASE_URL}/skills`, {
      signal: controller.signal,
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch skills: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Cache the data (only in browser)
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-skills', JSON.stringify(data));
      localStorage.setItem('portfolio-skills-timestamp', Date.now().toString());
    }
    
    return data;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Request timed out. Please check your connection.');
    }
    console.error('Error fetching skills:', err);
    throw err;
  }
}

// Pre-load function for initial page load
export async function preloadData() {
  try {
    const [projects, skills] = await Promise.all([
      fetchProjects(),
      fetchSkills()
    ]);
    
    return {
      projects,
      skills
    };
  } catch (error) {
    console.error('Error preloading data:', error);
    return {
      projects: [],
      skills: []
    };
  }
}
