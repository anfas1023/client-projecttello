/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
              pathname: '**',
          },
          {
              protocol: 'https',
              hostname: 'files.edgestore.dev',
              pathname: '**',
          },
          {
              protocol: 'https',
              hostname: 'source.unsplash.com',
              pathname: '**',
          },
          {
              protocol: 'https',
              hostname: 'projecttello.s3.ap-southeast-2.amazonaws.com',
              pathname: '**',
          },
      ],
  },
  reactStrictMode: false,
};



export default nextConfig;
