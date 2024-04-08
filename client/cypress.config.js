const {defineConfig} = require('cypress');
const admin = require('firebase-admin');
const cypressFirebasePlugin = require('cypress-firebase').plugin;
const serviceAccount = require('../serviceAccount.json');
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      // admin.initializeApp({
      //   credential: admin.credential.cert(serviceAccount),
      // });

      return cypressFirebasePlugin(on, config, admin, {
        // Here is where you can pass special options.

        // If you have not set the GCLOUD_PROJECT environment variable, give the projectId here, like so:
        projectId: 'project-951338584306',
        // if your databaseURL is not just your projectId plus ".firebaseio.com", then you _must_ give it here, like so:
        databaseURL: 'debateai-e087a.firebaseapp.com',
      });
    },
    baseUrl: 'http://localhost:3000',
  },
});
