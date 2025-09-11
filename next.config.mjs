/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'satyamdwivedi7.github.io',
                port: '',
                pathname: '/Images/**',
            },
        ],
    },
};

export default nextConfig;
