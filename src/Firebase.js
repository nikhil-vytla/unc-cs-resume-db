import app from "firebase/app";
import "firebase/auth";

// Used to access firebase functions
class Firebase {
  constructor() {
    app.initializeApp({
      apiKey: "AIzaSyC6nY6LMRHW7GX_p1NXTAoZ9vOafS9DzPE",
      authDomain: "unc-cs-resume-database-af14e.firebaseapp.com",
      databaseURL: "https://unc-cs-resume-database-af14e.firebaseio.com",
      projectId: "unc-cs-resume-database-af14e",
      storageBucket: "unc-cs-resume-database-af14e.appspot.com",
      messagingSenderId: "129154722676",
      appId: "1:129154722676:web:583be355ee4dbcfe261a21",
      measurementId: "G-WDT2LDB336",
    });
    this.auth = app.auth();
    // this.db = app.firestore();
  }

  login(email, pass) {
    return this.auth.signInWithEmailAndPassword(email, pass);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(email, pass) {
    const newProfile = await this.auth.createUserWithEmailAndPassword(
      email,
      pass
    );
    return newProfile;
  }

  // async register(name, email, pass) {
  //   await this.auth.createUserWithEmailAndPassword(email, pass);
  //   return this.auth.currentUser.updateProfile({ displayName: name });
  // }
}

export default new Firebase();
