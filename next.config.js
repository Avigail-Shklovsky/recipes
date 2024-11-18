const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/loginPage",
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      "tinyurl.com",
      "www.google.com",
      "encrypted-tbn0.gstatic.com",
      "adikosh.co.il",
      "encrypted-tbn0.gstatic.com",
    ],
  
  },
};

module.exports = nextConfig;
