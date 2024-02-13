const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // add custom commands and event listeners here
    },
    baseUrl: 'http://localhost:3000', // Adjust this according to your local/dev environment
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/index.js',
    env: {
      // Define environment variables for your tests here
      // For example, API endpoints, user credentials for different roles, etc.
    },
  },
  // Consider adding configurations for video and screenshot options if needed
  video: true,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  // Configure retries for flaky tests
  retries: {
    runMode: 2,
    openMode: 0,
  },
});
