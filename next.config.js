/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/backend/:path*',
                destination: `${process.env.BACKEND_URL}/:path*`,
            }
        ]
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
