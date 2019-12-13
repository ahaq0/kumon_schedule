import React, { useState, useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import axios from "axios";
import PostData from "../post/posts.json";

interface ITableState {
  columns: Array<Column<IRow>>;
  data: IRow[];
}

interface IRow {
  name: string;
  subjects: number;
  day1: number;
  day1Time: number;
  day2: number;
  day2Time: number;
}

function Student(
  fName: string,
  lName: string,
  subjects: string[],
  days: string[],
  startTime: number[]
) {
  this.fname = fName;
  this.lname = lName;
  this.subjects = subjects;
  this.days = days;
  this.dayStart = startTime;
}

let pData = [];
let ogData = [];

// I look at the index of the item that was deleted and then use that to find it's ID
// Which I use with axios to delete it from the database
// a normal object so I can retrive it's id to delete from the database.

function removeStudent(index) {
  const idOfStudent = pData[index]._id;
  //let student = convertStudentList2Student(studentToRemove);
  console.log("checking ");

  console.log(pData[index]._id);
  axios
    .delete("http://localhost:4000/students/delete-student/" + idOfStudent)
    .then(res => {
      console.log("Student successfully deleted!");
    })
    .catch(error => {
      console.log(error);
    });
}

// This function will create the data to be displayed in the
function createDataFromPost(postData) {
  const pdata = PostData;
  const data = [];

  // Parse through data to fit this format

  for (let i = 0; i < postData.length; i++) {
    const currentStudent = postData[i];

    const sName = currentStudent.fname + " " + currentStudent.lname;

    let subjectIndex: number;

    // Every student will have these, if they don't it'll be passed as the last index for empty string
    let sday1: number;
    let sday2: number;
    let sday1Time: number;
    let sday2Time: number;

    // Gotta double check this
    if (currentStudent.subjects.length > 1) {
      subjectIndex = 3;
    } else {
      if (currentStudent.subjects[0] === "math") {
        subjectIndex = 1;
      }
      // it is reading
      else {
        subjectIndex = 2;
      }
    }

    // Set the correct day column values for the table
    if (currentStudent.days.length > 1) {
      sday1 = findDayIndex(currentStudent.days[0]);
      sday2 = findDayIndex(currentStudent.days[1]);
    } else {
      sday1 = findDayIndex(currentStudent.days[0]);
      sday2 = 1; // 1 is empty string aka it doesn't exist / won't be shown
    }

    // if they're 2 days
    if (currentStudent.dayStart.length > 1) {
      sday1Time = currentStudent.dayStart[0];
      sday2Time = currentStudent.dayStart[1];
    }

    // only one day
    else {
      sday1Time = currentStudent.dayStart[0];
      sday2Time = 9;
    }

    const oneStudent = {
      name: sName,
      subjects: subjectIndex,
      day1: sday1,
      day1Time: sday1Time,
      day2: sday2,
      day2Time: sday2Time
    };

    data.push(oneStudent);
  }

  ogData = data;
  return data;
}

// This function takes a student stored in the list and returns the familiar student object used in the rest of the program
function convertStudentList2Student(studentList) {
  let lname = "";
  let fname = "";
  if (studentList.name !== "") {
    fname = studentList.name.split(" ")[0];
    // lname = studentList.name.split("")[1];
  }

  if (studentList.name.split()[1] !== null) {
    lname = studentList.name.split(" ")[1];
  }
  const subjects = [];

  // console.log("we're checkinig  " + studentList.subjects);
  switch (studentList.subjects) {
    case "1":
      subjects.push("math");
      break;
    case "2":
      subjects.push("reading");
      break;
    case "3":
      subjects.push("math reading");
      break;
  }
  // console.log("We have :" + subjects);
  // Check if it has 2 days
  const days = [];
  const dayStart = [];
  if ("day2" in studentList) {
    console.log("2 days!");

    // Parse first day for what day
    switch (studentList.day1) {
      case "1":
        days.push("tuesday");
        break;
      case "2":
        days.push("wednesday");
        break;
      case "3":
        days.push("friday");
        break;
    }

    switch (studentList.day2) {
      case "1":
        days.push("wednesday");
        break;
      case "2":
        days.push("friday");
        break;
      // case 3 - accident
      case "3":
        break;
    }

    // Now find out the start times
    dayStart.push(+studentList.day1Time);
    if (studentList.day2Time !== 9) {
      dayStart.push(+studentList.day2Time);
    }
  }
  // If it only has 1 day, we'll just make it have one day
  else {
    switch (studentList.day1) {
      case "1":
        days.push("tuesday");
        break;
      case "2":
        days.push("wednesday");
        break;
      case "3":
        days.push("friday");
        break;
    }

    dayStart.push(+studentList.day1);
  }

  // console.log(
  //   fname + " " + lname + "  " + subjects + " " + days + " " + dayStart
  // );

  return new Student(fname, lname, subjects, days, dayStart);
}

// I need to add the student to the DB however the input is different in this component vs how it is normally in the form
// So I convert this object into the appropriate model so that I can store in the DB and then store it.
function postStudentToDb(student) {
  // Might need some error handling here over potential names, default seperated by space.
  // Will add what if someone enters in a ""
  ogData.push(student);

  const newStudent = convertStudentList2Student(student);

  console.log(newStudent);
  // Send the newly created student to the database
  axios
    .post("http://localhost:4000/students/create-student", newStudent)
    .then(res => console.log(res.data));
}
// This function returns an index corresponding to the accurate day
function findDayIndex(day: string) {
  let index: number;
  switch (day) {
    case "tuesday":
      index = 1;
      break;
    case "wednesday":
      index = 2;
      break;
    case "friday":
      index = 3;
      break;
  }
  return index;
}

// This function will push the data as it's changed back into the database for next time!
export default function Students() {
  const [postData, setPostData] = React.useState({});

  function getData() {
    axios
      .get("http://localhost:4000/students/")
      .then(res => {
        // console.log(res.data);
        setPostData(res.data);
        pData = res.data;
        setState(prevState => {
          // let data = [...prevState.data];
          // data.push(createDataFromPost(res.data));
          let data = createDataFromPost(res.data);
          // ogData.push(newData);
          // console.log(ogData);
          // postStudentToDb(createDataFromPost(res.data));

          return { ...prevState, data };
        });
        const st = state;
        // return res.data;
        st.data = createDataFromPost(res.data);

        console.log(st);

        // Make a copy of old state
        // let newState = state;
        // newState.data = createDataFromPost(res.data);
        // ogData = createDataFromPost(res.data);

        // setState(st);
        // setState(newState);
        // console.log(state);
        // setState(ogData);
        // console.log(res.data);
        // ogData = createDataFromPost(res.data);
        // setState(state);
      })
      .catch(error => {
        console.log(error + " axios error");
      });
  }
  // Import data
  useEffect(() => {
    getData();
  }, []);

  const [state, setState] = useState<ITableState>({
    columns: [
      { title: "Name", field: "name" },

      {
        title: "Subjects",
        field: "subjects",
        lookup: { 1: "Math", 2: "Reading", 3: "Math Reading" }
      },

      {
        title: "Day 1",
        field: "day1",
        lookup: { 1: "Tuesday", 2: "Wednesday", 3: "Friday" }
      },
      {
        title: "Time",
        field: "day1Time",
        lookup: {
          1: "2 : 30 PM",
          2: "3 : 00 PM",
          3: "3 : 30 PM",
          4: "4 : 00 PM",
          5: "4 : 30 PM",
          6: "5 : 00 PM",
          7: "5 : 30 PM",
          8: "6 : 00 PM"
        },

        type: "time"
      },
      {
        title: "Day 2",
        field: "day2",
        lookup: { 1: "Wednesday", 2: "Friday", 3: "" }
      },
      {
        title: "Time",
        field: "day2Time",
        // Added a 9 here with empty string since it's possible that they don't have 2 days.
        lookup: {
          1: "2 : 30 PM",
          2: "3 : 00 PM",
          3: "3 : 30 PM",
          4: "4 : 00 PM",
          5: "4 : 30 PM",
          6: "5 : 00 PM",
          7: "5 : 30 PM",
          8: "6 : 00 PM",
          // So the 9 is there if it's hit by accident
          9: ""
        },
        type: "time"
      }
    ],
    // data: createDataFromPost(postData)
    data: ogData
  });
  return (
    <MaterialTable
      title="Student List"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                // ogData.push(newData);
                console.log(ogData);
                postStudentToDb(newData);

                return { ...prevState, data };
              });
            }, 300);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                console.log(oldData);
                removeStudent(data.indexOf(oldData));
                // console.log(oldData._id);

                // console.log(data.indexOf(oldData));

                data.splice(data.indexOf(oldData), 1);
                // console.log(data.indexOf(oldData));
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
    />
  );
}
