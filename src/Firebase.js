import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebase from "firebase";
import { data } from "jquery";

// Use methods to access firebase SDK
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
    this.db = app.firestore();
    this.storage = app.storage();
  }

  async login(email, pass) {
    try {
      const cred = await this.auth.signInWithEmailAndPassword(email, pass);
      return cred.user;
    } catch (err) {
      console.error(err);
    }
  }

  async logout() {
    try {
      return await this.auth.signOut();
    } catch (err) {
      console.error(err);
    }
  }

  // Creates user and returns User object
  async createUser(email, pass) {
    try {
      const cred = await this.auth.createUserWithEmailAndPassword(email, pass);
      return cred.user;
    } catch (err) {
      console.error(err);
    }
  }

  // returns a sample query
  async runQuery() {
    try {
      const data = await this.db
        .collection("students")
        .where("Skills", "array-contains", "Python")
        .where("Graduation Year", "==", 2021)
        .get();
      return data.docs.map((doc) => doc.data());
    } catch (err) {
      console.error(err);
    }
  }

  // gets all current profile information for the user
  async getUserInfo(userID) {
    try {
      const data = await this.db
        .collection("students")
        .where("UID", "==", userID)
        .get();
      return data.docs.map((doc) => doc.data());
    } catch (err) {
      console.log(err);
    }
  }

  // gets all recruiter
  async getAllRecruiters() {
    try {
      const data = await this.db.collection("recruiters").get();
      return data.docs.map((doc) => doc.data());
    } catch (err) {
      console.error(err);
    }
  }
  // gets all students
  async getAllStudents() {
    try {
      const data = await this.db.collection("students").get();
      return data.docs.map((doc) => doc.data());
    } catch (err) {
      console.error(err);
    }
  }

  async userInfoV2(userID) {
    try {
      const data = await this.db.collection("students").doc(userID).get();
      return data.docs.map((doc) => doc.data());
    } catch (error) {
      console.log(error);
    }
  }

  // gets all current profile information for the recruiter
  async getRecruiterInfo(userID) {
    try {
      const data = await this.db
        .collection("recruiters")
        .where("UID", "==", userID)
        .get();
      return data.docs.map((doc) => doc.data());
    } catch (err) {
      console.log(err);
    }
  }
  async getAllUsers() {
    try {
      const data = await this.db.collection("students").get();
      return data.docs.map((doc) => doc.data());
    } catch (error) {
      console.log(error);
    }
  }

  // gets all events
  async getAllEvents() {
    try {
      const data = await this.db.collection("Events").get();
      return data.docs.map((doc) => doc.data());
    } catch (err) {
      console.error(err);
    }
  }

  // gets all db
  async getAllDatabaseSystems() {
    try {
      const data = await this.db.collection("Database Systems").get();
      return data.docs.map((doc) => doc.data());
    } catch (err) {
      console.error(err);
    }
  }
  // gets all frameworks&tools
  async getAllFrameworksAndTools() {
    try {
      const data = await this.db.collection("Frameworks and Tools").get();
      return data.docs.map((doc) => doc.data());
    } catch (err) {
      console.error(err);
    }
  }

  // gets all grad yr
  async getAllGraduationYear() {
    try {
      const data = await this.db.collection("Graduation Year").get();
      return data.docs.map((doc) => doc.data());
    } catch (err) {
      console.error(err);
    }
  }
  // gets all events
  async getAllMajors() {
    try {
      const data = await this.db.collection("Majors").get();
      return data.docs.map((doc) => doc.data());
    } catch (err) {
      console.error(err);
    }
  }
  // gets all events
  async getAllOperatingSystems() {
    try {
      const data = await this.db.collection("OperatingSystems").get();
      return data.docs.map((doc) => doc.data());
    } catch (err) {
      console.error(err);
    }
  }
  // gets all events
  async getAllProgrammingLanguages() {
    try {
      const data = await this.db.collection("Programming Languages").get();
      return data.docs.map((doc) => doc.data());
    } catch (err) {
      console.error(err);
    }
  }
  // gets all events
  async getAllSchools() {
    try {
      const data = await this.db.collection("Schools").get();
      return data.docs.map((doc) => doc.data());
    } catch (err) {
      console.error(err);
    }
  }
}

export default new Firebase();
