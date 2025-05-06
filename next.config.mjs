/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '**'
      }
    ]
  },
  sassOptions: {
    // temporary silent warning for legacy-js-api
    // https://github.com/vercel/next.js/issues/71638
    silenceDeprecations: ['legacy-js-api']
  },
  webpack: (config) => {
    // https://typegoose.github.io/typegoose/docs/guides/known-issues
    // without this typegoose will create models and collections with minified names
    config.optimization.minimize = false;
    return config;
  }
};

export default nextConfig;
