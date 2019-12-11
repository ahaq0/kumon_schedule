const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let studentSchema = new Schema(
  {
    fname: {
      type: String
    },

    lname: {
      type: String
    },
    subjects: [
      {
        type: String
      }
    ],

    days: [
      {
        type: String
      }
    ],
    dayStart: [
      {
        type: Number
      }
    ]
  },

  {
    collection: "students"
  }
);

module.exports = mongoose.model("Student", studentSchema);
