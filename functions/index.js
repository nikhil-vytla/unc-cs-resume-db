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

// Need to add parameters for this path: userID and user
app.get("/getProfileInfo", async (req, res) => {
  try {
    if (req.body.currentUser !== null) {
      const data = await firestore.collection
        .doc("students")
        .where("UID", "==", auth().currentUser.uid)
        .get();
      const docs = data.docs.map((doc) => doc.data());
      res.send(docs);
    }
  } catch (error) {
    console.log(error);
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
    .catch((err) => console.log(err));

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

  await firestore
    .collection("students")
    .doc(user.uid)
    .set(studentData)
    .catch((err) => console.log(err));
  res.status(201).send();
});

// Adds new recruiter to the database
// request body = {"email": "example@email.com", "name": "myName"}
app.post("/newRecruiter", async (req, res) => {
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
      res.status(500).send(err);
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
      res.status(500).send(err);
    });
  res.status(201).send();
});

app.post("/newAdmin", async (req, res) => {
  const user = await auth()
    .getUserByEmail(req.body.email)
    .catch((err) => {
      res.status(404).send(err);
    });

  await auth()
    .setCustomUserClaims(user.uid, {
      student: false,
      recruiter: true,
      admin: true,
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

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

// adds a new list
app.put("/newList", async (req, res) => {
  // takes in uid and list name
  await firestore
    .collection("recruiters")
    .doc(req.body.recruiterUID)
    .update({
      [`Lists.${req.body.nameOfList}`]: [],
    });
  res.status(201).send();
});

// removes a list
app.put("/removeList", async (req, res) => {
  await firestore
    .collection("recruiters")
    .doc(req.body.recruiterUID)
    .update({
      [`Lists.${req.body.nameOfList}`]: admin.firestore.FieldValue.delete(),
    });
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
    });
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
    });
  res.status(201).send();
});

// Base API endpoint
exports.api = functions.https.onRequest(app);
