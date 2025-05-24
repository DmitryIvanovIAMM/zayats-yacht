/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '**'
      },
      new URL('https://s3.amazonaws.com/**')
    ]
  },
  sassOptions: {
    // temporary silent warning for legacy-js-api
    // https://github.com/vercel/next.js/issues/71638
    silenceDeprecations: ['legacy-js-api']
  }
};

export default nextConfig;
