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
    ["Profile Image"]: "",
    ["Resume PDF"]: "",
    ["Hide Resume"]: true,
    ["Intro"]: true,
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

app.post("/queryV3", async (req, res) => {
  const filters = req.body.filtersForQuery;
  // should be true if needs all cards
  const isEmpty = req.body.empty;

  // should be an array of events
  // Always includes UNC students
  // Form:  {name: "Event", value: "HackNC"}

  // checks to see iif filter list is empty
  // if (isEmpty) {
  //   const data = await firestore
  //     .collection("students")
  //     .get()
  //     .catch((err) => {
  //       res.status(400).send(err);
  //     });
  //   const docs = data.docs.map((doc) => doc.data());
  //   res.send(docs);
  //   return;
  // }

  // Figure out how to restrict starting query

  // Take in a resume access array
  // OR all UNC students and all resume access people
  let requiredResumeAccessArrayOR = [];
  let requiredResumeAccessArrayFinalOR = [];
  const data = await firestore
    .collection("students")
    .where("School", "==", "UNC Chapel Hill")
    .get();
  const uncStudentsArray = data.docs.map((doc) => doc.data());

  // Creates the resume access array of students
  requiredResumeAccessArrayOR = await singleQueryFunction(
    req.body.resumeAccess
  );
  // ORs UNC students and recruiter's resume access
  // NEED TO PUT THIS INTO DATABASE SO YOU DONT HAVE TO RECALCULATE EVERY TIME
  requiredResumeAccessArrayFinalOR = uncStudentsArray;
  requiredResumeAccessArrayOR.forEach((eachArray) => {
    requiredResumeAccessArrayFinalOR = orFilter(
      eachArray,
      requiredResumeAccessArrayFinalOR
    );
  });

  if (isEmpty) {
    // const data = await firestore
    //   .collection("students")
    //   .get()
    //   .catch((err) => {
    //     res.status(400).send(err);
    //   });
    // const docs = data.docs.map((doc) => doc.data());
    res.send(requiredResumeAccessArrayFinalOR);
    return;
  }

  // Need to OR UNC Students and all other event students
  // if (resumeAccessArray.length !== 0) {
  //   const initialResume = resumeAccessArray;
  //   // Now OR the arrays inside proLangOR
  //   resumeOR = await singleQueryFunction(initialResume);
  //   resumeFinalOR = resumeOR[0];
  //   resumeOR.forEach((eachArray) => {
  //     resumeFinalOR = orFilter(eachArray, resumeFinalOR);
  //   });
  //   //orHolder.push(resumeFinalOR);
  // }

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

    return tempArray;
  };
  // Querying function
  const singleQueryFunction = async (arrayName) => {
    let storingArray = [];

    let promiseArray = [];
    arrayName.forEach((eachQueryOBJ) => {
      const currentQuery = startingQuery.where(
        eachQueryOBJ.name,
        "==",
        eachQueryOBJ.value
      );
      const data = currentQuery.get();
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

  const intersect = (arrA, arrB) => {
    return arrA.filter((objA) => arrB.some((objB) => objA.UID === objB.UID));
  };
  // ANDs sub groups
  andFinal = requiredResumeAccessArrayFinalOR;
  orHolder.forEach((eachArray) => {
    andFinal = intersect(eachArray, andFinal);
  });
  res.send(andFinal);
});

app.put("/checkboxV2", async (req, res) => {
  return cors()(req, res, async () => {
    const valuePlaceHolder = req.body.valueToSend;
    const updatedOBJ = req.body.update;

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
