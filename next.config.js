/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
  webpack(config) {
    config.resolve.alias.canvas = false;
    return config;
  },
  distDir: 'build',
  typescript: {
    ignoreBuildErrors: true
  }
};

export default config;
