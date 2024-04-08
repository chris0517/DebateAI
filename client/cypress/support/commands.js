// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import {attachCustomCommands} from 'cypress-firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCzDJg38dsxQsJrrs5Ffbm89gx9ji4SA5c',
  authDomain: 'debateai-e087a.firebaseapp.com',
  projectId: 'debateai-e087a',
  storageBucket: 'debateai-e087a.appspot.com',
  messagingSenderId: '951338584306',
  appId: '1:951338584306:web:4c875062653a92310c686b',
  measurementId: 'G-VDQFBCPEWD',
};

firebase.initializeApp(firebaseConfig);
attachCustomCommands({Cypress, cy, firebase});
