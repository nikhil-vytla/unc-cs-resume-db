import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Use methods to access firebase SDK
export default class Firebase {
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

  async signout() {
    return await this.auth.signOut()
    .catch(err => console.log(err));
  }

  async logout() {
    return await this.auth.signOut()
    .catch(err => console.log(err));
  }

  // gets all current profile information for the user
  async getUserInfo(userID) {
    const data = await this.db
    .collection("students")
    .where("UID", "==", userID)
    .get()
    .catch(err => console.log(err));
    return data.docs.map((doc) => doc.data());
  }

  // gets all recruiter
  async getAllRecruiters() {
    const data = await this.db.collection("recruiters").get()
    .catch(err => console.log(err));
    return data.docs.map((doc) => doc.data());
  }

  // gets all students
  async getAllStudents() {
    const data = await this.db
    .collection("students")
    .where("Hide Resume", "==", false)
    .get()
    .catch(err => console.log(err));
    return data.docs.map((doc) => doc.data());
  }

  async userInfoV2(userID) {
    const data = await this.db.collection("students").doc(userID).get()
    .catch(err => console.log(err));
    return data.docs.map((doc) => doc.data());
  }

  async getEventCodes() {
    const data = await this.db.collection("Events").doc("eventCodes").get()
    .catch(err => console.log(err));
    return data.data();
  }

  // gets all current profile information for the recruiter
  async getRecruiterInfo(userID) {
    const data = await this.db
    .collection("recruiters")
    .where("UID", "==", userID)
    .get()
    .catch(err => console.log(err));
    return data.docs.map((doc) => doc.data());
  }

  async getAllUsers() {
    const data = await this.db.collection("students").get()
    .catch(err => console.log(err));
    return data.docs.map((doc) => doc.data());
  }

//   // Call this function after sign up
//   async putNewUserIntoDB(currentUser) {
//     const dataForDB = {
//       Email: currentUser.email,
//       "Database Systems": {},
//       "Programming Languages": {},
//       "Frameworks and Tools": {},
//       Events: {},
//       "First Name": "",
//       "Last Name": "",
//       "Graduation Year": "",
//       "School": "",
//       "Minors": {},
//       "Operating Systems": {},
//       "Primary Major": "",
//       "Secondary Major": "",
//       Seeking: "",
//       UID: currentUser.uid,
//       "Profile Image": "",
//       "Resume PDF": "",
//     };
//     await this.db.collection("students").doc(currentUser.uid).set(dataForDB)
//     .catch(err => console.log(err));
//   }
}
