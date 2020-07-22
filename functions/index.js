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

// Creates new user in the database
app.post("/newUser", async (req, res) => {
  try {
    const currentUser = req.body;
    const dataForDB = {
      ["Email"]: currentUser.email,
      ["Database Systems"]: {},
      ["Programming Languages"]: {},
      ["Frameworks and Tools"]: {},
      ["Events"]: {},
      ["First Name"]: "",
      ["Last Name"]: "",
      ["Graduation Year"]: "",
      ["School"]: "",
      ["Minors"]: {},
      ["Operating Systems"]: {},
      ["Primary Major"]: "",
      ["Secondary Major"]: "",
      ["Seeking"]: "",
      ["UID"]: currentUser.uid,
      ["Profile Image"]:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      ["Resume PDF"]: "",
    };
    await firestore.collection("students").doc(currentUser.uid).set(dataForDB);
    res.status(201).send();
  } catch (error) {
    console.error(error);
  }
});

// Base API endpoint
exports.api = functions.https.onRequest(app);
