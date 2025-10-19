import { defineConfig } from 'cypress';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://opencart.abstracta.us',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    video: true,
    screenshotOnRunFailure: true,
    supportFile: false,
    setupNodeEvents(on, config) {
    },
    chromeWebSecurity: false
  },
});