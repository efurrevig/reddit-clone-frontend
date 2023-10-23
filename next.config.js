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
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.AWS_IMAGES_URL,
                port: '',
                pathname: '/*'
            }
        ]
    },
}

module.exports = nextConfig
