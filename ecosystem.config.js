module.exports = {
  apps: [
    {
      name: 'jrmproduction',
      script: 'dist/shared/infra/http/server.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
