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
    ],
    dangerouslyAllowSVG: true
  },
  sassOptions: {
    // temporary silent warning for legacy-js-api
    // https://github.com/vercel/next.js/issues/71638
    silenceDeprecations: ['legacy-js-api']
  },
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:8081'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
