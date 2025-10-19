const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://opencart.abstracta.us',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // Event Listeners de Node, en caso de ser necesarios
    },
  },
});