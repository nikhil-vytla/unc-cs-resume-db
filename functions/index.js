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
    if (req.body.currentUser !== null) {
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
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png",
      ["Resume PDF"]: "",
      ["Hide Resume"]: true,
    };
    await firestore.collection("students").doc(currentUser.uid).set(dataForDB);
    res.status(201).send();
  } catch (error) {
    console.error(error);
  }
});

// Trashy query endpoint
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
    case "11":
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
        .where(req.body.filter.name11, "==", req.body.filter.value11)
        .get();
      break;

    default:
      break;
  }
  const docs = data.docs.map((doc) => doc.data());
  res.send(docs);
});

// app.post("/query", async (req, res) => {
//   const test = req.body.filter1;

//   // console.log(test);
//   const testQuery = "await firestore.collection('students')" + test;
//   //const data = eval("(async () => {" + testQuery + "})();");
//   const data = (async () => {
//     await firestore
//       .collection("students")
//       .where("Graduation Year", "==", "2020");
//   })();
//   // console.log(testData);
//   const docs = data.docs.map((doc) => doc.data());
//   res.send(docs);
// });

// app.post("/query/<RecruiterID>", async (req, res) => {

//   // Recruiter has access to UNC and HACKNC

//   const additonalFilters = {
//     name: "Events.HackNC", value: true
//   }
// });

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
