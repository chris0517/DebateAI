import { initializeApp } from 'firebase/app';
import { getAuth  } from 'firebase/auth'; // Import other Firebase services if needed

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzDJg38dsxQsJrrs5Ffbm89gx9ji4SA5c",
  authDomain: "debateai-e087a.firebaseapp.com",
  projectId: "debateai-e087a",
  storageBucket: "debateai-e087a.appspot.com",
  messagingSenderId: "951338584306",
  appId: "1:951338584306:web:4c875062653a92310c686b",
  measurementId: "G-VDQFBCPEWD"
};

class Firebase {
  constructor() {
    const firebaseApp = initializeApp(firebaseConfig);
    this.auth = getAuth(firebaseApp);
  }

  // *** Auth API ***
  
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => {
    localStorage.removeItem("currentUserID");
    this.auth.signOut();
  }

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);


  doGetUserByEmail = email => this.auth.getUserByEmail(email)

  doGetIdToken = () => {
    return new Promise((resolve, reject) => {
    const user = this.auth.currentUser;
    if (user) {
      user.getIdToken().then(token => {
        resolve(token);
      }).catch(error => {
      reject(error);
    });
    } else {
      reject(new Error('No user is signed in.'));
    }
    })
  }
    

}

const firebaseInstance = new Firebase();

export default firebaseInstance;

