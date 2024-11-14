/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [{
            source: "/api/:path*", // Define the endpoint pattern in your frontend
            destination: "https://techtest.youapp.ai/api/:path*", // Proxy to your backend server
        }, ];
    },
};

module.exports = nextConfig;