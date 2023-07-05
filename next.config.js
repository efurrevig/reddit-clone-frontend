/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/backend/:path*',
                destination: 'http://localhost:3001/api/:path*',
            }
        ]
    },
}

module.exports = nextConfig
