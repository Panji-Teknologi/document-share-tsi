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
        PORT: 3001,
        NEXTAUTH_URL: "https://194.195.92.47:3001/",
        DATABASE_URL: "mysql://root:admin@localhost:3308/document-tsi",
        NEXTAUTH_SECRET: "verySecretKey",
      },
    },
  ],
};
