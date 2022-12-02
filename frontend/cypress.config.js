const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:1234',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    PICTURE_DIR: '/home/adrien/Bureau/titre_pro/projet/frontend/src/assets',
  },
});
