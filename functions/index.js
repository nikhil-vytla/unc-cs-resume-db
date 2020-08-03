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

app.post("/queryV3", async (req, res) => {
  const filters = req.body.filtersForQuery;
  // should be true if needs all cards
  const isEmpty = req.body.empty;

  if (isEmpty) {
    const data = await firestore
      .collection("students")
      .get()
      .catch((err) => {
        res.status(400).send(err);
      });
    const docs = data.docs.map((doc) => doc.data());
    res.send(docs);
    return;
  }

  const startingQuery = firestore.collection("students");

  let orHolder = [];

  let progLangOR = [];
  let proLangFinalOR = [];

  let frameOR = [];
  let frameFinalOR = [];

  let dbOR = [];
  let dbFinalOR = [];

  let schoolOR = [];
  let schoolFinalOR = [];

  let opOR = [];
  let opFinalOR = [];

  let eventsOR = [];
  let eventsFinalOR = [];

  let gradOR = [];
  let gradFinalOR = [];

  let primMajorOR = [];
  let primMajorFinalOR = [];

  let secMajorOR = [];
  let secMajorFinalOR = [];

  let minorsOR = [];
  let minorsFinalOR = [];

  let andFinal = [];
  // FiltersOBJ: {
  // Programming Languages: [Programming Languages.Java, Programming Languages.Python],
  // Frameworks And Tools: [],
  // Events: [],
  // etc...
  // }
  // or each item in each section
  // then and the results

  // ORing function
  const orFilter = (arrA, arrB) => {
    // const orPart = arrA.filter((objA) =>
    //   arrB.filter((objB) => objA.UID !== objB.UID)
    // );

    let tempArray = [];

    let setForLookups = new Set();

    // Student UID list for lookups
    for (const eachOBJ of arrA) {
      setForLookups.add(eachOBJ.UID);
      tempArray.push(eachOBJ);
    }

    for (const eachOBJ of arrB) {
      if (!setForLookups.has(eachOBJ.UID)) {
        tempArray.push(eachOBJ);
      }
    }

    // for (const eachOBJ of arrB) {
    //   for (const studentUID of eachOBJ) {

    //   }
    // }

    // const andPart = arrA.filter((objA) =>
    //   arrB.some((objB) => objA.UID === objB.UID)
    // );

    // const tempArray = [...new Set([...orPart, ...andPart])];

    return tempArray;
  };

  // Querying function
  const singleQueryFunction = async (arrayName) => {
    let storingArray = [];

    // for (const eachQueryOBJ of arrayName) {
    //   const currentQuery = startingQuery.where(
    //     eachQueryOBJ.name,
    //     "==",
    //     eachQueryOBJ.value
    //   );
    //   const data = await currentQuery.get();
    //   const docs = data.docs.map((doc) => doc.data());
    //   storingArray.push(docs);
    // }

    let promiseArray = [];
    arrayName.forEach((eachQueryOBJ) => {
      const currentQuery = startingQuery.where(
        eachQueryOBJ.name,
        "==",
        eachQueryOBJ.value
      );
      const data = currentQuery.get();
      //const docs = data.docs.map((doc) => doc.data());
      promiseArray.push(data);
    });

    storingArray = await Promise.all(promiseArray);

    let finalQueryArray = [];
    storingArray.forEach((data) => {
      const docs = data.docs.map((doc) => doc.data());
      finalQueryArray.push(docs);
    });

    return finalQueryArray;
  };

  if (filters["Programming Languages"].length !== 0) {
    const initialProgramming = filters["Programming Languages"];
    // Now OR the arrays inside proLangOR
    progLangOR = await singleQueryFunction(initialProgramming);
    proLangFinalOR = progLangOR[0];
    progLangOR.forEach((eachArray) => {
      proLangFinalOR = orFilter(eachArray, proLangFinalOR);
    });
    orHolder.push(proLangFinalOR);
  }

  if (filters["Frameworks and Tools"].length !== 0) {
    const initialFrames = filters["Frameworks and Tools"];
    // Now OR the arrays inside proLangOR
    frameOR = await singleQueryFunction(initialFrames);
    frameFinalOR = frameOR[0];
    frameOR.forEach((eachArray) => {
      frameFinalOR = orFilter(eachArray, frameFinalOR);
    });
    orHolder.push(frameFinalOR);
  }

  if (filters["Database Systems"].length !== 0) {
    const initialDB = filters["Database Systems"];
    // Now OR the arrays inside proLangOR
    dbOR = await singleQueryFunction(initialDB);
    dbFinalOR = dbOR[0];
    dbOR.forEach((eachArray) => {
      dbFinalOR = orFilter(eachArray, dbFinalOR);
    });
    orHolder.push(dbFinalOR);
  }

  if (filters["School"].length !== 0) {
    const initialSchool = filters["School"];
    // Now OR the arrays inside proLangOR
    schoolOR = await singleQueryFunction(initialSchool);
    schoolFinalOR = schoolOR[0];
    schoolOR.forEach((eachArray) => {
      schoolFinalOR = orFilter(eachArray, schoolFinalOR);
    });
    orHolder.push(schoolFinalOR);
  }

  if (filters["Operating Systems"].length !== 0) {
    const initialOP = filters["Operating Systems"];
    // Now OR the arrays inside proLangOR
    opOR = await singleQueryFunction(initialOP);
    opFinalOR = opOR[0];
    opOR.forEach((eachArray) => {
      opFinalOR = orFilter(eachArray, opFinalOR);
    });
    orHolder.push(opFinalOR);
  }

  if (filters["Events"].length !== 0) {
    const initialEvents = filters["Events"];
    // Now OR the arrays inside proLangOR
    eventsOR = await singleQueryFunction(initialEvents);
    eventsFinalOR = eventsOR[0];
    eventsOR.forEach((eachArray) => {
      eventsFinalOR = orFilter(eachArray, eventsFinalOR);
    });
    orHolder.push(eventsFinalOR);
  }

  if (filters["Graduation Year"].length !== 0) {
    const initialGrad = filters["Graduation Year"];
    // Now OR the arrays inside proLangOR
    gradOR = await singleQueryFunction(initialGrad);
    gradFinalOR = gradOR[0];
    gradOR.forEach((eachArray) => {
      gradFinalOR = orFilter(eachArray, gradFinalOR);
    });
    orHolder.push(gradFinalOR);
  }

  if (filters["Primary Major"].length !== 0) {
    const initialPrimary = filters["Primary Major"];
    // Now OR the arrays inside proLangOR
    primMajorOR = await singleQueryFunction(initialPrimary);
    primMajorFinalOR = primMajorOR[0];
    primMajorOR.forEach((eachArray) => {
      primMajorFinalOR = orFilter(eachArray, primMajorFinalOR);
    });
    orHolder.push(primMajorFinalOR);
  }

  if (filters["Secondary Major"].length !== 0) {
    const initialSecondary = filters["Secondary Major"];
    // Now OR the arrays inside proLangOR
    secMajorOR = await singleQueryFunction(initialSecondary);
    secMajorFinalOR = secMajorOR[0];
    secMajorOR.forEach((eachArray) => {
      secMajorFinalOR = orFilter(eachArray, secMajorFinalOR);
    });
    orHolder.push(secMajorFinalOR);
  }

  if (filters["Minors"].length !== 0) {
    const initialMinors = filters["Minors"];
    // Now OR the arrays inside proLangOR
    minorsOR = await singleQueryFunction(initialMinors);
    minorsFinalOR = minorsOR[0];
    minorsOR.forEach((eachArray) => {
      minorsFinalOR = orFilter(eachArray, minorsFinalOR);
    });
    orHolder.push(minorsFinalOR);
  }

  // const intersect = (arrA, arrB) => {
  //   return arrA.filter((x) => x.uid === arrB);
  // };

  // list1.filter(a => list2.some(b => a.userId === b.userId));

  //console.log(orHolder);

  const intersect = (arrA, arrB) => {
    return arrA.filter((objA) => arrB.some((objB) => objA.UID === objB.UID));
  };

  // ANDs sub groups
  andFinal = orHolder[0];
  orHolder.forEach((eachArray) => {
    andFinal = intersect(eachArray, andFinal);
    //console.log(andFinal);
  });
  res.send(andFinal);
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

// Base API endpoint
exports.api = functions.https.onRequest(app);
