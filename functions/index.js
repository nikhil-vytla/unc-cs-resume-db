const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();
const cors = require("cors");

/* Manually create this file, using json data downloaded at 
firebase console-> project settings-> service accounts-> generate private key.*/
const adminConfig = require("./adminConfig.json");

// Init admin SDK
admin.initializeApp({
  credential: admin.credential.cert(adminConfig),
  databaseURL: "https://unc-cs-resume-database-af14e.firebaseio.com",
});

app.use(cors({ origin: true }));

const firestore = admin.firestore();
const auth = admin.auth;

// Default response for /api
app.get("/", (req, res) => {
  res.send("You've reached the base API endpoint");
});

// // Send GET request to /api/users to get array of all users
// app.get("/users", async (req, res) => {
//   const data = await firestore.collection("students").get()
//   .catch(err => {
//     res.status(400).send(err);
//   });
//   const docs = data.docs.map((doc) => doc.data());
//   res.send(docs);
// });

// // Need to add parameters for this path: userID and user
// app.get("/getProfileInfo", async (req, res) => {
//   if (req.body.currentUser !== null) {
//     const data = await firestore.collection
//       .doc("students")
//       .where("UID", "==", auth().currentUser.uid)
//       .get()
//       .catch(err => res.status(500).send(err));
//     const docs = data.docs.map((doc) => doc.data());
//     res.send(docs);
//   }
// });

// Gets auth claims for user acct
// request body = {"email": "example@email.com"}
app.get("/getUserClaims", async (req, res) => {
  if (!req.body.email)
    res.status(400).send("Must include email in request body");

  const { email } = req.body;
  const claims = await auth()
    .getUserByEmail(email)
    .catch((err) => res.status(404).send(err)).customClaims;
  res.status(200).send(claims);
});

// Adds new student with auth claims to the database
// request body = {"email": "example@email.com"}
app.post("/newStudent", async (req, res) => {
  if (!req.body.email)
    res.status(400).send("Must include email in request body");
  // const unc_email_re = /^\S+@(\S*\.|)unc.edu$/;

  const user = await auth()
    .getUserByEmail(req.body.email)
    .catch((err) => {
      res.status(404).send(err);
    });

  await auth()
    .setCustomUserClaims(user.uid, {
      student: true,
      recruiter: false,
      admin: false,
    })
    .catch((err) => res.status(500).send(err));

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

  await firestore
    .collection("students")
    .doc(user.uid)
    .set(studentData)
    .catch((err) => res.status(400).send(err));
  res.status(201).send();
});

// Adds new recruiter with auth claims to the database
// request body = {"email": "example@email.com", "name": "myName"}
app.post("/newRecruiter", async (req, res) => {
  if (!req.body.email || !req.body.name) {
    res.status(400).send("Must include an email and name in request");
  }
  const user = await auth()
    .getUserByEmail(req.body.email)
    .catch((err) => {
      res.status(404).send(err);
    });

  await auth()
    .setCustomUserClaims(user.uid, {
      student: false,
      recruiter: true,
      admin: false,
    })
    .catch((err) => {
      res.status(400).send(err);
    });

  const recruiterData = {
    ["Name"]: req.body.name,
    ["Email"]: req.body.email,
    ["UID"]: user.uid,
    ["Lists"]: {
      ["Favorites"]: [],
    },
    ["Resume Access"]: [],
  };

  await firestore
    .collection("recruiters")
    .doc(user.uid)
    .set(recruiterData)
    .catch((err) => {
      res.status(400).send(err);
    });
  res.status(201).send();
});

// Add admin auth claims to user acct
// request body = {"email": "example@email.com"}
app.post("/newAdmin", async (req, res) => {
  if (!req.body.email)
    res.status(400).send("Must include email in request body");

  const user = await auth()
    .getUserByEmail(req.body.email)
    .catch((err) => {
      res.status(404).send(err);
    });

  await auth()
    .setCustomUserClaims(user.uid, {
      student: true,
      recruiter: true,
      admin: true,
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// adds requested school to request list
app.post("/requestSchool", async (req, res) => {
  if (!req.body.school)
    res.status(400).send("Must include school in request body");

  const schoolValue = req.body.school;
  await firestore
    .collection("Schools")
    .doc("RequestedSchools")
    .update({
      schoolsList: admin.firestore.FieldValue.arrayUnion(schoolValue),
    })
    .catch((err) => res.status(500).send(err));
  res.status(201).send();
});

app.post("/query", async (req, res) => {
  let query = firestore.collection("students");

  const filters = req.body.filtersForQuery;

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
  const data = await query.get().catch((err) => res.status(500).send(err));
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

    await firestore
      .collection("students")
      .doc(req.body.uid)
      .update({
        [currentObjString]: type,
      })
      .catch((err) => res.status(500).send(err));
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
      })
      .catch((err) => res.status(500).send(err));
    res.status(201).send();
  });
});

// adds a new list
app.put("/newList", async (req, res) => {
  // takes in uid and list name
  await firestore
    .collection("recruiters")
    .doc(req.body.recruiterUID)
    .update({
      [`Lists.${req.body.nameOfList}`]: [],
    })
    .catch((err) => res.status(500).send(err));
  res.status(201).send();
});

// removes a list
app.put("/removeList", async (req, res) => {
  await firestore
    .collection("recruiters")
    .doc(req.body.recruiterUID)
    .update({
      [`Lists.${req.body.nameOfList}`]: admin.firestore.FieldValue.delete(),
    })
    .catch((err) => res.status(500).send(err));
  res.status(201).send();
});

// adds a student to a recruiter's list
app.put("/addStudent", async (req, res) => {
  // input: nameOfList, recruiterUID, student
  await firestore
    .collection("recruiters")
    .doc(req.body.recruiterUID)
    .update({
      [`Lists.${req.body.nameOfList}`]: admin.firestore.FieldValue.arrayUnion(
        req.body.student
      ),
    })
    .catch((err) => res.status(500).send(err));
  res.status(201).send();
});

// endpoint for recruiters to remove students from lists
app.put("/deleteStudent", async (req, res) => {
  // input: nameOfList, recruiterUID, student
  await firestore
    .collection("recruiters")
    .doc(req.body.recruiterUID)
    .update({
      [`Lists.${req.body.nameOfList}`]: admin.firestore.FieldValue.arrayRemove(
        req.body.student
      ),
    })
    .catch((err) => res.status(500).send(err));
  res.status(201).send();
});

//delete event code map field
app.put("/removeEventCodeField", async (req, res) => {
  await firestore
    .collection("Events")
    .doc("eventCodes")
    .update({
      [`codes.${req.body.eCode}`]: admin.firestore.FieldValue.delete(),
    })
    .catch((err) => res.status(500).send(err));
  res.status(201).send();
});

// Base API endpoint
exports.api = functions.https.onRequest(app);
