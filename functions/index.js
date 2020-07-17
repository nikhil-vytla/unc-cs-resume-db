const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();

/* Manually create this file, using json data downloaded at 
firebase console-> project settings-> service accounts-> generate private key.*/
const adminConfig = require("./adminConfig.json");

// Init admin SDK
admin.initializeApp({
  credential: admin.credential.cert(adminConfig),
  databaseURL: "https://unc-cs-resume-database-af14e.firebaseio.com",
});

const firestore = admin.firestore();

// Default response for /api
app.get("/", (req, res) => {
  res.send("You've reached the base API endpoint");
});

// Send GET request to /api/users to get array of all users
app.get("/users", async (req, res) => {
  try {
    const data = await firestore.collection("students").get();
    const docs = data.docs.map((doc) => doc.data());
    res.send(docs);
  } catch (err) {
    console.error(err);
  }
});

// Send POST request to /api/data to write data to firestore
app.post("/data", async (req, res) => {
  try {
    const data = await firestore
      .collection("data")
      .doc("test")
      .set({ test: "mydata" });
    res.send(data);
  } catch (err) {
    console.error(err);
  }
});

// Need to add parameters for this path: userID and user
app.get("/getProfileInfo", async (req, res) => {
  try {
    if (firebase.auth().currentUser != null) {
      const data = await firestore.collection
        .doc("students")
        .where("UID", "==", firebase.auth().currentUser.uid)
        .get();
      const docs = data.docs.map((doc) => doc.data());
      res.send(docs);
    }
  } catch (error) {
    console.log(error);
  }
});

// Base API endpoint
exports.api = functions.https.onRequest(app);
