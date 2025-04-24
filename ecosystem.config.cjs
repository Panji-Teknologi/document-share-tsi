module.exports = {
  apps: [
    {
      name: "document-share-tsi",
      script: "npm",
      args: "start",
      cwd: "/Project/document-share-tsi", // path to folder project
      env: {
        HOST: "0.0.0.0",
        NODE_ENV: "production",
        PORT: 5000,
        NEXTAUTH_URL: "https://194.195.92.47:5000/",
        DATABASE_URL:
          "mysql://root:admin@194.195.92.47:3309/document-share-tsi",
        NEXTAUTH_SECRET: "verySecretKey",
      },
    },
  ],
};
