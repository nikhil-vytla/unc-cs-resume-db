import app from 'firebase/app';
import * as config from './config.json';
import 'firebase/auth';

// Used to access firebase functions
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    // this.db = app.firestore();
  }

  login(email, pass) {
    return this.auth.signInWithEmailAndPassword(email, pass);
  }

  logout() {
    return this.auth.signOut();
  }

  // async register(name, email, pass) {
  //   await this.auth.createUserWithEmailAndPassword(email, pass);
  //   return this.auth.currentUser.updateProfile({displayName: name});
  // }
}

export default new Firebase();