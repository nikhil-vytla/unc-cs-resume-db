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

  if (
    !(
      email_reg({ exact: true }).test(req.body.email) &&
      /^\S+@(\S*\.|)unc.edu$/.test(req.body.email)
    )
  )
    res.status(400).send("Must be a valid UNC email");
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

  const adminEmail = req.body.currentAdminEmail;
  const adminUser = (await auth().getUserByEmail(adminEmail)).customClaims;

  if (adminUser.admin) {
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
  } else {
    res.status(401).send();
  }
});

// adds requested school to request list
app.post("/requestSchool", async (req, res) => {
  if (!req.body.school)
    res.status(400).send("Must include school in request body");

  const email = req.body.currentStudentEmail;
  const claims = (await auth().getUserByEmail(email)).customClaims;

  if (claims.student || claims.admin) {
    const schoolValue = req.body.school;
    await firestore
      .collection("Schools")
      .doc("RequestedSchools")
      .update({
        schoolsList: admin.firestore.FieldValue.arrayUnion(schoolValue),
      })
      .catch((err) => res.status(500).send(err));
    res.status(201).send();
  } else {
    res.status(401).send();
  }
});

app.post("/queryV3", async (req, res) => {
  const filters = req.body.filtersForQuery;
  // should be true if needs all cards
  const isEmpty = req.body.empty;

  let prevQueries = req.body.currentQueries;

  const startingQuery = firestore
    .collection("students")
    .where("Hide Resume", "==", false);

  // Could the starting query just be all of the events
  // Events OR UNC ==> cant do that :/

  // Array of filters for each type
  // Array of students
  // Possibly store the entire student result on the client side
  // so we dont have to keep reading the database.
  // Or maybe store it in the database, then pull from db,
  // then OR and And in endpoint, checking which filters are
  // on or off

  // Take in a resume access array
  // OR all UNC students and all resume access people
  const requiredResumeAccessArrayFinalOR = req.body.resumeAccess;

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

  const intersect = (arrA, arrB) => {
    return arrA.filter((objA) => arrB.some((objB) => objA.UID === objB.UID));
  };

  if (isEmpty) {
    prevQueries["Programming Languages"]["prevFilters"] = [];
    prevQueries["Programming Languages"]["prevQuery"] = [];
    prevQueries["Frameworks and Tools"]["prevFilters"] = [];
    prevQueries["Frameworks and Tools"]["prevQuery"] = [];
    prevQueries["Database Systems"]["prevFilters"] = [];
    prevQueries["Database Systems"]["prevQuery"] = [];
    prevQueries["School"]["prevFilters"] = [];
    prevQueries["School"]["prevQuery"] = [];
    prevQueries["Operating Systems"]["prevFilters"] = [];
    prevQueries["Operating Systems"]["prevQuery"] = [];
    prevQueries["Events"]["prevFilters"] = [];
    prevQueries["Events"]["prevQuery"] = [];
    prevQueries["Graduation Year"]["prevFilters"] = [];
    prevQueries["Graduation Year"]["prevQuery"] = [];
    prevQueries["Primary Major"]["prevFilters"] = [];
    prevQueries["Primary Major"]["prevQuery"] = [];
    prevQueries["Secondary Major"]["prevFilters"] = [];
    prevQueries["Secondary Major"]["prevQuery"] = [];
    prevQueries["Minors"]["prevFilters"] = [];
    prevQueries["Minors"]["prevQuery"] = [];
    res.send({
      students: requiredResumeAccessArrayFinalOR,
      queries: { "Active Queries": prevQueries },
    });
    return;
  }

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

  if (filters["Programming Languages"].length !== 0) {
    if (
      prevQueries["Programming Languages"]["prevFilters"].length ===
      filters["Programming Languages"].length
    ) {
      // The query hasn't changed so return the prev
      orHolder.push(prevQueries["Programming Languages"]["prevQuery"]);
    } else if (
      prevQueries["Programming Languages"]["prevFilters"].length <
      filters["Programming Languages"].length
    ) {
      // this means that you added a query

      progLangOR = await singleQueryFunction(
        req.body.newFilter["Programming Languages"]
      );

      const newQueryObj = orFilter(
        progLangOR[0],
        prevQueries["Programming Languages"]["prevQuery"]
      );

      orHolder.push(newQueryObj);

      prevQueries["Programming Languages"]["prevQuery"] = newQueryObj;
      prevQueries["Programming Languages"]["prevFilters"].push(
        req.body.newFilter["Programming Languages"][0]
      );
    } else {
      // a filter has been removed
      // Need to remake the rest of the query
      const initialProgramming = filters["Programming Languages"];
      // Now OR the arrays inside proLangOR
      progLangOR = await singleQueryFunction(initialProgramming);
      proLangFinalOR = progLangOR[0];
      progLangOR.forEach((eachArray) => {
        proLangFinalOR = orFilter(eachArray, proLangFinalOR);
      });

      prevQueries["Programming Languages"]["prevFilters"] =
        filters["Programming Languages"];
      prevQueries["Programming Languages"]["prevQuery"] = proLangFinalOR;

      orHolder.push(proLangFinalOR);
    }
  } else {
    prevQueries["Programming Languages"]["prevFilters"] = [];
    prevQueries["Programming Languages"]["prevQuery"] = [];
  }

  if (filters["Frameworks and Tools"].length !== 0) {
    if (
      prevQueries["Frameworks and Tools"]["prevFilters"].length ===
      filters["Frameworks and Tools"].length
    ) {
      // The query hasn't changed so return the prev
      orHolder.push(prevQueries["Frameworks and Tools"]["prevQuery"]);
    } else if (
      prevQueries["Frameworks and Tools"]["prevFilters"].length <
      filters["Frameworks and Tools"].length
    ) {
      // this means that you added a query

      progLangOR = await singleQueryFunction(
        req.body.newFilter["Frameworks and Tools"]
      );

      const newQueryObj = orFilter(
        progLangOR[0],
        prevQueries["Frameworks and Tools"]["prevQuery"]
      );

      orHolder.push(newQueryObj);

      prevQueries["Frameworks and Tools"]["prevQuery"] = newQueryObj;
      prevQueries["Frameworks and Tools"]["prevFilters"].push(
        req.body.newFilter["Frameworks and Tools"][0]
      );
    } else {
      const initialFrames = filters["Frameworks and Tools"];
      // Now OR the arrays inside proLangOR
      frameOR = await singleQueryFunction(initialFrames);
      frameFinalOR = frameOR[0];
      frameOR.forEach((eachArray) => {
        frameFinalOR = orFilter(eachArray, frameFinalOR);
      });
      orHolder.push(frameFinalOR);
    }
  } else {
    prevQueries["Frameworks and Tools"]["prevFilters"] = [];
    prevQueries["Frameworks and Tools"]["prevQuery"] = [];
  }

  if (filters["Database Systems"].length !== 0) {
    if (
      prevQueries["Database Systems"]["prevFilters"].length ===
      filters["Database Systems"].length
    ) {
      // The query hasn't changed so return the prev
      orHolder.push(prevQueries["Database Systems"]["prevQuery"]);
    } else if (
      prevQueries["Database Systems"]["prevFilters"].length <
      filters["Database Systems"].length
    ) {
      // this means that you added a query

      progLangOR = await singleQueryFunction(
        req.body.newFilter["Database Systems"]
      );

      const newQueryObj = orFilter(
        progLangOR[0],
        prevQueries["Database Systems"]["prevQuery"]
      );

      orHolder.push(newQueryObj);

      prevQueries["Database Systems"]["prevQuery"] = newQueryObj;
      prevQueries["Database Systems"]["prevFilters"].push(
        req.body.newFilter["Database Systems"][0]
      );
    } else {
      const initialDB = filters["Database Systems"];
      // Now OR the arrays inside proLangOR
      dbOR = await singleQueryFunction(initialDB);
      dbFinalOR = dbOR[0];
      dbOR.forEach((eachArray) => {
        dbFinalOR = orFilter(eachArray, dbFinalOR);
      });
      orHolder.push(dbFinalOR);
    }
  } else {
    prevQueries["Database Systems"]["prevFilters"] = [];
    prevQueries["Database Systems"]["prevQuery"] = [];
  }

  if (filters["School"].length !== 0) {
    if (
      prevQueries["School"]["prevFilters"].length === filters["School"].length
    ) {
      // The query hasn't changed so return the prev
      orHolder.push(prevQueries["School"]["prevQuery"]);
    } else if (
      prevQueries["School"]["prevFilters"].length < filters["School"].length
    ) {
      // this means that you added a query

      progLangOR = await singleQueryFunction(req.body.newFilter["School"]);

      const newQueryObj = orFilter(
        progLangOR[0],
        prevQueries["School"]["prevQuery"]
      );

      orHolder.push(newQueryObj);

      prevQueries["School"]["prevQuery"] = newQueryObj;
      prevQueries["School"]["prevFilters"].push(
        req.body.newFilter["School"][0]
      );
    } else {
      const initialSchool = filters["School"];
      // Now OR the arrays inside proLangOR
      schoolOR = await singleQueryFunction(initialSchool);
      schoolFinalOR = schoolOR[0];
      schoolOR.forEach((eachArray) => {
        schoolFinalOR = orFilter(eachArray, schoolFinalOR);
      });
      orHolder.push(schoolFinalOR);
    }
  } else {
    prevQueries["School"]["prevFilters"] = [];
    prevQueries["School"]["prevQuery"] = [];
  }

  if (filters["Operating Systems"].length !== 0) {
    if (
      prevQueries["Operating Systems"]["prevFilters"].length ===
      filters["Operating Systems"].length
    ) {
      // The query hasn't changed so return the prev
      orHolder.push(prevQueries["Operating Systems"]["prevQuery"]);
    } else if (
      prevQueries["Operating Systems"]["prevFilters"].length <
      filters["Operating Systems"].length
    ) {
      // this means that you added a query

      progLangOR = await singleQueryFunction(
        req.body.newFilter["Operating Systems"]
      );

      const newQueryObj = orFilter(
        progLangOR[0],
        prevQueries["Operating Systems"]["prevQuery"]
      );

      orHolder.push(newQueryObj);

      prevQueries["Operating Systems"]["prevQuery"] = newQueryObj;
      prevQueries["Operating Systems"]["prevFilters"].push(
        req.body.newFilter["Operating Systems"][0]
      );
    } else {
      const initialOP = filters["Operating Systems"];
      // Now OR the arrays inside proLangOR
      opOR = await singleQueryFunction(initialOP);
      opFinalOR = opOR[0];
      opOR.forEach((eachArray) => {
        opFinalOR = orFilter(eachArray, opFinalOR);
      });
      orHolder.push(opFinalOR);
    }
  } else {
    prevQueries["Operating Systems"]["prevFilters"] = [];
    prevQueries["Operating Systems"]["prevQuery"] = [];
  }

  if (filters["Events"].length !== 0) {
    if (
      prevQueries["Events"]["prevFilters"].length === filters["Events"].length
    ) {
      // The query hasn't changed so return the prev
      orHolder.push(prevQueries["Events"]["prevQuery"]);
    } else if (
      prevQueries["Events"]["prevFilters"].length < filters["Events"].length
    ) {
      // this means that you added a query

      progLangOR = await singleQueryFunction(req.body.newFilter["Events"]);

      const newQueryObj = orFilter(
        progLangOR[0],
        prevQueries["Events"]["prevQuery"]
      );

      orHolder.push(newQueryObj);

      prevQueries["Events"]["prevQuery"] = newQueryObj;
      prevQueries["Events"]["prevFilters"].push(
        req.body.newFilter["Events"][0]
      );
    } else {
      const initialEvents = filters["Events"];
      // Now OR the arrays inside proLangOR
      eventsOR = await singleQueryFunction(initialEvents);
      eventsFinalOR = eventsOR[0];
      eventsOR.forEach((eachArray) => {
        eventsFinalOR = orFilter(eachArray, eventsFinalOR);
      });
      orHolder.push(eventsFinalOR);
    }
  } else {
    prevQueries["Events"]["prevFilters"] = [];
    prevQueries["Events"]["prevQuery"] = [];
  }

  if (filters["Graduation Year"].length !== 0) {
    if (
      prevQueries["Graduation Year"]["prevFilters"].length ===
      filters["Graduation Year"].length
    ) {
      // The query hasn't changed so return the prev
      orHolder.push(prevQueries["Graduation Year"]["prevQuery"]);
    } else if (
      prevQueries["Graduation Year"]["prevFilters"].length <
      filters["Graduation Year"].length
    ) {
      // this means that you added a query

      progLangOR = await singleQueryFunction(
        req.body.newFilter["Graduation Year"]
      );

      const newQueryObj = orFilter(
        progLangOR[0],
        prevQueries["Graduation Year"]["prevQuery"]
      );

      orHolder.push(newQueryObj);

      prevQueries["Graduation Year"]["prevQuery"] = newQueryObj;
      prevQueries["Graduation Year"]["prevFilters"].push(
        req.body.newFilter["Graduation Year"][0]
      );
    } else {
      const initialGrad = filters["Graduation Year"];
      // Now OR the arrays inside proLangOR
      gradOR = await singleQueryFunction(initialGrad);
      gradFinalOR = gradOR[0];
      gradOR.forEach((eachArray) => {
        gradFinalOR = orFilter(eachArray, gradFinalOR);
      });
      orHolder.push(gradFinalOR);
    }
  } else {
    prevQueries["Graduation Year"]["prevFilters"] = [];
    prevQueries["Graduation Year"]["prevQuery"] = [];
  }

  if (filters["Primary Major"].length !== 0) {
    if (
      prevQueries["Primary Major"]["prevFilters"].length ===
      filters["Primary Major"].length
    ) {
      // The query hasn't changed so return the prev
      orHolder.push(prevQueries["Primary Major"]["prevQuery"]);
    } else if (
      prevQueries["Primary Major"]["prevFilters"].length <
      filters["Primary Major"].length
    ) {
      // this means that you added a query

      progLangOR = await singleQueryFunction(
        req.body.newFilter["Primary Major"]
      );

      const newQueryObj = orFilter(
        progLangOR[0],
        prevQueries["Primary Major"]["prevQuery"]
      );

      orHolder.push(newQueryObj);

      prevQueries["Primary Major"]["prevQuery"] = newQueryObj;
      prevQueries["Primary Major"]["prevFilters"].push(
        req.body.newFilter["Primary Major"][0]
      );
    } else {
      const initialPrimary = filters["Primary Major"];
      // Now OR the arrays inside proLangOR
      primMajorOR = await singleQueryFunction(initialPrimary);
      primMajorFinalOR = primMajorOR[0];
      primMajorOR.forEach((eachArray) => {
        primMajorFinalOR = orFilter(eachArray, primMajorFinalOR);
      });
      orHolder.push(primMajorFinalOR);
    }
  } else {
    prevQueries["Primary Major"]["prevFilters"] = [];
    prevQueries["Primary Major"]["prevQuery"] = [];
  }

  if (filters["Secondary Major"].length !== 0) {
    if (
      prevQueries["Secondary Major"]["prevFilters"].length ===
      filters["Secondary Major"].length
    ) {
      // The query hasn't changed so return the prev
      orHolder.push(prevQueries["Secondary Major"]["prevQuery"]);
    } else if (
      prevQueries["Secondary Major"]["prevFilters"].length <
      filters["Secondary Major"].length
    ) {
      // this means that you added a query

      progLangOR = await singleQueryFunction(
        req.body.newFilter["Secondary Major"]
      );

      const newQueryObj = orFilter(
        progLangOR[0],
        prevQueries["Secondary Major"]["prevQuery"]
      );

      orHolder.push(newQueryObj);

      prevQueries["Secondary Major"]["prevQuery"] = newQueryObj;
      prevQueries["Secondary Major"]["prevFilters"].push(
        req.body.newFilter["Secondary Major"][0]
      );
    } else {
      const initialSecondary = filters["Secondary Major"];
      // Now OR the arrays inside proLangOR
      secMajorOR = await singleQueryFunction(initialSecondary);
      secMajorFinalOR = secMajorOR[0];
      secMajorOR.forEach((eachArray) => {
        secMajorFinalOR = orFilter(eachArray, secMajorFinalOR);
      });
      orHolder.push(secMajorFinalOR);
    }
  } else {
    prevQueries["Secondary Major"]["prevFilters"] = [];
    prevQueries["Secondary Major"]["prevQuery"] = [];
  }

  if (filters["Minors"].length !== 0) {
    if (
      prevQueries["Minors"]["prevFilters"].length === filters["Minors"].length
    ) {
      // The query hasn't changed so return the prev
      orHolder.push(prevQueries["Minors"]["prevQuery"]);
    } else if (
      prevQueries["Minors"]["prevFilters"].length < filters["Minors"].length
    ) {
      // this means that you added a query

      progLangOR = await singleQueryFunction(req.body.newFilter["Minors"]);

      const newQueryObj = orFilter(
        progLangOR[0],
        prevQueries["Minors"]["prevQuery"]
      );

      orHolder.push(newQueryObj);

      prevQueries["Minors"]["prevQuery"] = newQueryObj;
      prevQueries["Minors"]["prevFilters"].push(
        req.body.newFilter["Minors"][0]
      );
    } else {
      const initialMinors = filters["Minors"];
      // Now OR the arrays inside proLangOR
      minorsOR = await singleQueryFunction(initialMinors);
      minorsFinalOR = minorsOR[0];
      minorsOR.forEach((eachArray) => {
        minorsFinalOR = orFilter(eachArray, minorsFinalOR);
      });
      orHolder.push(minorsFinalOR);
    }
  } else {
    prevQueries["Minors"]["prevFilters"] = [];
    prevQueries["Minors"]["prevQuery"] = [];
  }

  // ANDs sub groups
  andFinal = requiredResumeAccessArrayFinalOR;

  orHolder.forEach((eachArray) => {
    andFinal = intersect(eachArray, andFinal);
  });

  res.send({ students: andFinal, queries: { "Active Queries": prevQueries } });
});

app.post("/resumeAccessStudents", async (req, res) => {
  return cors()(req, res, async () => {
    let requiredResumeAccessArrayOR = [];
    let requiredResumeAccessArrayFinalOR = [];
    const data = await firestore
      .collection("students")
      .where("School", "==", "UNC Chapel Hill")
      .where("Hide Resume", "==", false)
      .get();
    const uncStudentsArray = data.docs.map((doc) => doc.data());

    const singleQueryFunction = async (arrayName) => {
      let storingArray = [];
      let promiseArray = [];

      const startingQuery = firestore.collection("students");
      arrayName.forEach((eachQueryOBJ) => {
        const currentQuery = startingQuery
          .where(eachQueryOBJ.name, "==", eachQueryOBJ.value)
          .where("Hide Resume", "==", false);
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

    // Creates the resume access array of students
    // ORs UNC students and recruiter's resume access
    requiredResumeAccessArrayFinalOR = uncStudentsArray;
    if (req.body.resumeAccess.length !== 0) {
      requiredResumeAccessArrayOR = await singleQueryFunction(
        req.body.resumeAccess
      );
      requiredResumeAccessArrayOR.forEach((eachArray) => {
        requiredResumeAccessArrayFinalOR = orFilter(
          eachArray,
          requiredResumeAccessArrayFinalOR
        );
      });
    }

    // .catch((err) => res.status(500).send(err));
    res.status(201).send(requiredResumeAccessArrayFinalOR);
  });
});

app.put("/checkboxV2", async (req, res) => {
  const email = req.body.currentStudentEmail;
  const claims = (await auth().getUserByEmail(email)).customClaims;

  if (claims.student || claims.admin) {
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
  } else {
    res.status(401).send();
  }
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
  const adminEmail = req.body.currentAdminEmail;
  const adminUser = (await auth().getUserByEmail(adminEmail)).customClaims;

  if (adminUser.admin) {
    await firestore
      .collection("Events")
      .doc("eventCodes")
      .update({
        [`codes.${req.body.eCode}`]: admin.firestore.FieldValue.delete(),
      })
      .catch((err) => res.status(500).send(err));
    res.status(201).send();
  } else {
    res.status(401).send();
  }
});

//endpoint for admin to remove students from the db
app.put("/removeStudentFromDB", async (req, res) => {
  const adminEmail = req.body.currentAdminEmail;
  const adminUser = (await auth().getUserByEmail(adminEmail)).customClaims;

  if (adminUser.admin) {
    await firestore
      .collection("students")
      .doc(req.body.studentUID)
      .delete()
      .catch((err) => res.status(500).send(err));
    res.status(201).send();
  } else {
    res.status(401).send();
  }
});

//endpoint for admin to remove recruiter from the db
app.put("/removeRecruiterFromDB", async (req, res) => {
  const adminEmail = req.body.currentAdminEmail;
  const adminUser = (await auth().getUserByEmail(adminEmail)).customClaims;

  if (adminUser.admin) {
    await firestore
      .collection("recruiters")
      .doc(req.body.recruiterUID)
      .delete()
      .catch((err) => res.status(500).send(err));
    res.status(201).send();
  } else {
    res.status(401).send();
  }
});

// Base API endpoint
exports.api = functions.https.onRequest(app);
