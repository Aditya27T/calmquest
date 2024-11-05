/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: [
            'statik.tempo.co',
            'images.tempo.co',
            'res.cloudinary.com',  
            'pbs.twimg.com',   
            'i.ibb.co.com'
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
  },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = { fs: false, path: false };
        }
        return config;
    }
};

module.exports = nextConfig;