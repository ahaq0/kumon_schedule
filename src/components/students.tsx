import React, { useState } from "react";
import MaterialTable, { Column } from "material-table";

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

// This function will create the data to be displayed in the
function createDataFromPost() {
  const pdata = PostData;

  let data = [];

  for (const item of pdata) {
    const studentName = item.fName + " " + item.lName;

    let subjectIndex: number;

    // Every student will have these, if they don't it'll be passed as the last index for empty string
    let sday1: number;
    let sday2: number;
    let sday1Time: number;
    let sday2Time: number;

    // Just covering all of the cases of potential subjects since I use an index in the form
    // if we have two subjects
    if (item.subjects.length > 1) {
      subjectIndex = 3;
    } else {
      if (item.subjects[0] === "math") {
        subjectIndex = 1;
      }
      // it is reading
      else {
        subjectIndex = 2;
      }
    }

    // Set the correct day column values for the table
    if (item.days.length > 1) {
      sday1 = findDayIndex(item.days[0]);
      sday2 = findDayIndex(item.days[1]);
    } else {
      sday1 = findDayIndex(item.days[0]);
      sday2 = 1; // 1 is empty string aka it doesn't exist / won't be shown
    }

    // if they're 2 days
    if (item.startTime.length > 1) {
      sday1Time = item.startTime[0];
      sday2Time = item.startTime[1];
    }

    // only one day
    else {
      sday1Time = item.startTime[0];
      sday2Time = 9;
    }

    let oneStudent = {
      name: studentName,
      subjects: subjectIndex,
      day1: sday1,
      day1Time: sday1Time,
      day2: sday2,
      day2Time: sday2Time
    };
    data.push(oneStudent);

    // Find out the correct time values for the day(s)
    // Important to note that its possible we won't have a time for 2nd day
  }
  console.log(data);
  return data;
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
        lookup: { 1: "", 2: "Wednesday", 3: "Friday" }
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
          9: ""
        },
        type: "time"
      }
    ],
    data: createDataFromPost()
    // data: [
    //   { name: "Mark", subjects: 2, day1: 2, day1Time: 1, day2: 1, day2Time: 9 },
    //   {
    //     name: "Zerya Betül",
    //     subjects: 3,
    //     day1: 1,
    //     day1Time: 3,
    //     day2: 2,
    //     day2Time: 4
    //   }
    // ]
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

                console.log(newData);

                return { ...prevState, data };
              });
            }, 600);
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
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
    />
  );
}
