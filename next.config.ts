/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: [
            'statik.tempo.co',
            'images.tempo.co',
            'res.cloudinary.com',     
        ],
        minimumCacheTTL: 60,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.tempo.co',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**.alodokter.com',
                pathname: '/**',
            },
        ],
  }
};

module.exports = nextConfig;