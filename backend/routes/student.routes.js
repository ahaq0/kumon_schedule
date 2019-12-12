let mongoose = require("mongoose");
let express = require("express");
let router = express.Router();

// A student schema
let student = require("../models/Student");

// Building a student
router.route("/create-student").post((req, res, next) => {
  student.create(req.body, (error, data) => {
    if (error) {
      console.log(error + " sigh");

      return next(error);
    } else {
      console.log(data);
      return res.json(data);
    }
  });
});

// Read Students
router.route("/").get((req, res, next) => {
  student.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      return res.json(data);
    }
  });
});

module.exports = router;
