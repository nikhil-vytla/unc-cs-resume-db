const { https } = require("firebase-functions");
const { initializeApp, credential, firestore, auth } = require("firebase-admin");
const cors = require("cors");

/* Manually create this file, using json data downloaded at 
firebase console-> project settings-> service accounts-> generate private key.*/
const adminConfig = require("./adminConfig.json");

const app = require("express")();
const bp = require("body-parser");

// Init admin SDK
initializeApp({
  credential: credential.cert(adminConfig),
  databaseURL: "https://unc-cs-resume-database-af14e.firebaseio.com",
});

app.use(cors({ origin: true }));
app.use(bp.json());

// Default response for /api
app.get("/", (req, res) => {
  res.send("You've reached the base API endpoint");
});

// Need to add parameters for this path: userID and user
app.get("/getProfileInfo", async (req, res) => {
  if (req.body.currentUser !== null) {
    const data = await firestore().collection
      .doc("students")
      .where("UID", "==", req.body.currentUser.uid)
      .get()
      .catch(err => console.log(err));
    const docs = data.docs.map((doc) => doc.data());
    res.send(docs);
  }
});

app.get("/getUserClaims", async (req, res) => {
  const { email } = req.body;
  const claims = (await auth().getUserByEmail(email)).customClaims;
  res.send(claims);
});

// Adds new student to the database
// request body = {"email": "example@email.com"}
app.post("/newStudent", async (req, res) => {
  const unc_email_re = /^\S+@(\S*\.|)unc.edu$/;

  const user = await auth().getUserByEmail(req.body.email)
  .catch(err => {
    res.status(404).send(err);
  });

  await auth().setCustomUserClaims(user.uid, {
    student: true,
    recruiter: false,
    admin: false,
  }).catch(err => console.log(err));

  console.log(user);
  const studentData = {
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

  await firestore().collection("students")
    .doc(user.uid)
    .set(studentData)
    .catch(err => console.log(err));
  res.status(201).send();
});

// Adds new recruiter to the database
// request body = {"email": "example@email.com", "name": "myName"}
app.post("/newRecruiter", async (req, res) => {
  const user = await auth().getUserByEmail(req.body.email)
  .catch(err => {
    res.status(404).send(err);
  });

  await auth().setCustomUserClaims(user.uid, {
    student: false,
    recruiter: true,
    admin: false,
  }).catch(err => {
    res.status(500).send(err);
  });

  const recruiterData = {
    ["Name"]: req.body.name,
    ["Email"]: req.body.email,
    ["UID"]: user.uid,
    ["Lists"]: {
      ["Favorites"]: []
    },
    ["Resume Access"]: []
  }

  await firestore().collection("recruiters")
    .doc(user.uid)
    .set(recruiterData)
    .catch(err => {
      res.status(500).send(err);
    });
  res.status(201).send();
});

app.post("/newAdmin", async (req, res) => {
  const user = await auth().getUserByEmail(req.body.email)
  .catch(err => {
    res.status(404).send(err);
  });

  await auth().setCustomUserClaims(user.uid, {
    student: false,
    recruiter: true,
    admin: true,
  }).catch(err => {
    res.status(500).send(err);
  });
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
  await firestore()
    .collection("Schools")
    .doc("RequestedSchools")
    .update({
      schoolsList: firestore().FieldValue.arrayUnion(schoolValue),})
    .catch(err => console.log(err));
  res.status(201).send();
});

app.post("/query", async (req, res) => {
  let query = firestore().collection("students");

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
  const data = await query.get()
  .catch(err => res.status(400).send(err));

  const docs = data.docs.map((doc) => doc.data());
  res.send(docs);
});

app.put("/updateCheckbox", async (req, res) => {
  const array = req.body.arrayList;

  array.forEach(async (eachUpdate) => {
    const valuePlaceHolder = req.body.valueToSend;
    const currentState = eachUpdate;
    const currentObjString = `${valuePlaceHolder}.${currentState}`;
    const type = req.body.typeToSend;

    await firestore()
      .collection("students")
      .doc(req.body.uid)
      .update({
        [currentObjString]: type,
      }).catch(err => {
        res.status(409).send(err);
      });
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

exports.api = https.onRequest(app);
