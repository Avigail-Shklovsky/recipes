const nextConfig = {
  images: {
    domains: [
      "tinyurl.com",
      "www.google.com",
      "encrypted-tbn0.gstatic.com",
      "adikosh.co.il",
      "encrypted-tbn0.gstatic.com",
    ],
    headers: [
      {
        key: "Cache-Control",
        value: "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
      {
        key: "Pragma",
        value: "no-cache",
      },
      {
        key: "Expires",
        value: "0",
      },
    ],
  },
};

module.exports = nextConfig;