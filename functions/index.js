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

// Trashy query endpoint for 10 filters max
app.post("/queryStudents", async (req, res) => {
  let data;
  switch (req.body.numberOfFilters) {
    case "1":
      data = await firestore
        .collection("students")
        .where(req.body.filter.name1, "==", req.body.filter.value1)
        .get();
      break;
    case "2":
      data = await firestore
        .collection("students")
        .where(req.body.filter.name1, "==", req.body.filter.value1)
        .where(req.body.filter.name2, "==", req.body.filter.value2)
        .get();
      break;
    case "3":
      data = await firestore
        .collection("students")
        .where(req.body.filter.name1, "==", req.body.filter.value1)
        .where(req.body.filter.name2, "==", req.body.filter.value2)
        .where(req.body.filter.name3, "==", req.body.filter.value3)
        .get();

      break;
    case "4":
      data = await firestore
        .collection("students")
        .where(req.body.filter.name1, "==", req.body.filter.value1)
        .where(req.body.filter.name2, "==", req.body.filter.value2)
        .where(req.body.filter.name3, "==", req.body.filter.value3)
        .where(req.body.filter.name4, "==", req.body.filter.value4)
        .get();

      break;
    case "5":
      data = await firestore
        .collection("students")
        .where(req.body.filter.name1, "==", req.body.filter.value1)
        .where(req.body.filter.name2, "==", req.body.filter.value2)
        .where(req.body.filter.name3, "==", req.body.filter.value3)
        .where(req.body.filter.name4, "==", req.body.filter.value4)
        .where(req.body.filter.name5, "==", req.body.filter.value5)
        .get();

      break;
    case "6":
      data = await firestore
        .collection("students")
        .where(req.body.filter.name1, "==", req.body.filter.value1)
        .where(req.body.filter.name2, "==", req.body.filter.value2)
        .where(req.body.filter.name3, "==", req.body.filter.value3)
        .where(req.body.filter.name4, "==", req.body.filter.value4)
        .where(req.body.filter.name5, "==", req.body.filter.value5)
        .where(req.body.filter.name6, "==", req.body.filter.value6)
        .get();

      break;
    case "7":
      data = await firestore
        .collection("students")
        .where(req.body.filter.name1, "==", req.body.filter.value1)
        .where(req.body.filter.name2, "==", req.body.filter.value2)
        .where(req.body.filter.name3, "==", req.body.filter.value3)
        .where(req.body.filter.name4, "==", req.body.filter.value4)
        .where(req.body.filter.name5, "==", req.body.filter.value5)
        .where(req.body.filter.name6, "==", req.body.filter.value6)
        .where(req.body.filter.name7, "==", req.body.filter.value7)
        .get();

      break;
    case "8":
      data = await firestore
        .collection("students")
        .where(req.body.filter.name1, "==", req.body.filter.value1)
        .where(req.body.filter.name2, "==", req.body.filter.value2)
        .where(req.body.filter.name3, "==", req.body.filter.value3)
        .where(req.body.filter.name4, "==", req.body.filter.value4)
        .where(req.body.filter.name5, "==", req.body.filter.value5)
        .where(req.body.filter.name6, "==", req.body.filter.value6)
        .where(req.body.filter.name7, "==", req.body.filter.value7)
        .where(req.body.filter.name8, "==", req.body.filter.value8)
        .get();

      break;
    case "9":
      data = await firestore
        .collection("students")
        .where(req.body.filter.name1, "==", req.body.filter.value1)
        .where(req.body.filter.name2, "==", req.body.filter.value2)
        .where(req.body.filter.name3, "==", req.body.filter.value3)
        .where(req.body.filter.name4, "==", req.body.filter.value4)
        .where(req.body.filter.name5, "==", req.body.filter.value5)
        .where(req.body.filter.name6, "==", req.body.filter.value6)
        .where(req.body.filter.name7, "==", req.body.filter.value7)
        .where(req.body.filter.name8, "==", req.body.filter.value8)
        .where(req.body.filter.name9, "==", req.body.filter.value9)
        .get();
      break;
    case "10":
      data = await firestore
        .collection("students")
        .where(req.body.filter.name1, "==", req.body.filter.value1)
        .where(req.body.filter.name2, "==", req.body.filter.value2)
        .where(req.body.filter.name3, "==", req.body.filter.value3)
        .where(req.body.filter.name4, "==", req.body.filter.value4)
        .where(req.body.filter.name5, "==", req.body.filter.value5)
        .where(req.body.filter.name6, "==", req.body.filter.value6)
        .where(req.body.filter.name7, "==", req.body.filter.value7)
        .where(req.body.filter.name8, "==", req.body.filter.value8)
        .where(req.body.filter.name9, "==", req.body.filter.value9)
        .where(req.body.filter.name10, "==", req.body.filter.value10)
        .get();
      break;

    default:
      break;
  }
  const docs = data.docs.map((doc) => doc.data());
  res.send(docs);
});

// Base API endpoint
exports.api = functions.https.onRequest(app);
