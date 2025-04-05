import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        serverActions: {
            bodySizeLimit: "10mb", // or '5mb', '20mb' depending on your needs
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.dicebear.com",
                pathname: "/7.x/identicon/svg",
            },
            {
                protocol: "https",
                hostname: "encrypted-tbn0.gstatic.com",
                pathname: "/images",
            },
            {
                protocol: "https",
                hostname: "kitchenofdebjani.com",
                pathname: "/wp-content/uploads/**",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/rupayan/image/upload/**",
            },
            {
                protocol: "http",
                hostname: "res.cloudinary.com",
                pathname: "/rupayan/image/upload/**",
            },
        ],
    },
};

export default nextConfig;
