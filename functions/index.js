const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();
const bp = require("body-parser");
const cors = require("cors");

/* Manually create this file, using json data downloaded at 
firebase console-> project settings-> service accounts-> generate private key.*/
const adminConfig = require("./adminConfig.json");

// Init admin SDK
admin.initializeApp({
  credential: admin.credential.cert(adminConfig),
  databaseURL: "https://unc-cs-resume-database-af14e.firebaseio.com",
});

const firestore = admin.firestore();

app.use(cors({ origin: true }));
app.use(bp.json());

// Default response for /api
app.get("/", (req, res) => {
  res.send("You've reached the base API endpoint");
});

// Need to add parameters for this path: userID and user
app.get("/getProfileInfo", async (req, res) => {
  if (req.body.currentUser !== null) {
    const data = await firestore.collection
      .doc("students")
      .where("UID", "==", firebase.auth().currentUser.uid)
      .get()
    .catch(err => console.log(err));
    const docs = data.docs.map((doc) => doc.data());
    res.send(docs);
  }
});

// Adds admin permissions to user
app.post("/newAdmin", async (req, res) => {
  const user = await admin.auth().getUserByEmail(req.body.email)
  .catch(err => console.log(err));

  await admin.auth().setCustomUserClaims(user.uid, {
    admin: true,
    recruiter: true,
  }).catch(err => console.log(err));

  res.status(200).send({
      result: `Success! ${user.email} is now an admin.`
  });
});

// Adds new student in the database
app.post("/newStudent", async (req, res) => {
  const user = await admin.auth().getUserByEmail(req.body.email)
  .catch(err => {
    res.status(404).send(err);
  });

  await admin.auth().setCustomUserClaims(user.uid, {
    student: true,
  }).catch(err => console.log(err));

  const userData = {
    ["Email"]: user.email,
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
    ["UID"]: user.uid,
    ["Profile Image"]:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png",
    ["Resume PDF"]: "",
    ["Hide Resume"]: true,
  };
  await firestore.collection("students").doc(user.uid).set(userData);
  res.status(201).send();
});

// Adds new recruiter in the database
app.post("/newRecruiter", async (req, res) => {
  const user = await admin.auth().getUserByEmail(req.body.email)
  .catch(err => {
    res.status(404).send(err);
  });

  await admin.auth().setCustomUserClaims(user.uid, {
    recruiter: true,
  }).catch(err => console.log(err));

  const userData = {
    ["Name"]: "",
    ["Email"]: user.email,
    ["UID"]: user.uid,
    ["Lists"]: {
      ["Favorites"]: []
    },
    ["Resume Access"]: []
  };

  await firestore.collection("recruiters").doc(user.uid).set(userData);
  res.status(201).send();
});

// app.post("/query/<RecruiterID>", async (req, res) => {

//   // Recruiter has access to UNC and HACKNC

//   const additonalFilters = {
//     name: "Events.HackNC", value: true
//   }
// });

// adds requested school to request list
app.post("/requestSchool", async (req, res) => {
  const schoolValue = req.body.school;
  await firestore
    .collection("Schools")
    .doc("RequestedSchools")
    .update({
      schoolsList: admin.firestore.FieldValue.arrayUnion(schoolValue),
    });
  res.status(201).send();
});

app.post("/query", async (req, res) => {
  let query = firestore.collection("students");

  const filters = req.body.filters;

  // This is how the request should be filters = [
  // {
  //   filters: [
  //     {
  //       "name": "Graduation Year",
  //       "value": "2020",
  //     },
  //     {
  //       "name": "Programming Languages.Python",
  //       "value": true,
  //     },
  //     {
  //       "name": "Database Systems.Oracle",
  //       "value": true,
  //     },
  //   ],
  // };
  let addFilter = (newQuery, filterName, filterValue) => {
    query = newQuery.where(filterName, "==", filterValue);
  };
  filters.forEach((filter) => {
    addFilter(query, filter.name, filter.value);
  });
  const data = await query.get();
  const docs = data.docs.map((doc) => doc.data());
  res.send(docs);
});

app.put("/updateCheckbox", async (req, res) => {
  const array = req.body.arrayList;

  array.forEach(async (eachUpdate) => {
    try {
      const valuePlaceHolder = req.body.valueToSend;
      const currentState = eachUpdate;
      const currentObjString = `${valuePlaceHolder}.${currentState}`;
      const type = req.body.typeToSend;

      await firestore
        .collection("students")
        .doc(req.body.uid)
        .update({
          [currentObjString]: type,
        });
    } catch (error) {
      console.log(error);
    }
  });
  res.status(201).send();
});

app.put("/checkboxV2", async (req, res) => {
  return cors()(req, res, async () => {
    const valuePlaceHolder = req.body.valueToSend;
    const updatedOBJ = req.body.update;

    // await firestore
    //   .collection("students")
    //   .doc(req.body.uid)
    //   .set(
    //     {
    //       [valuePlaceHolder]: updatedOBJ,
    //     },
    //     { merge: true }
    //   );

    // Replaces whole field with the updated info
    // rather than update specific fields
    await firestore
      .collection("students")
      .doc(req.body.uid)
      .update({
        [valuePlaceHolder]: updatedOBJ,
      });
    res.status(201).send();
  });
});

// Base API endpoint
exports.api = functions.https.onRequest(app);
