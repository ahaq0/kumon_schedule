import React, {
  FunctionComponent,
  useEffect,
  useState,
  Component
} from "react";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import PostData from "../post/posts.json";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default
      }
    }
  })
)(TableRow);

function parseSchedule(day: string) {
  const data = PostData;

  // I am creating the data for each row, this is an object type
  // There are 8 possible time slots for a students
  const rowsData = [];
  const daySchedule = ["", "", "", "", "", "", "", "", ""];
  // so for each student, we want to make a string regarding their schedule to put in the table
  // const dayPassed = "wednesday";
  const dayPassed = day;
  let count = 1;
  for (const item of data) {
    const studentName = item.fName + " " + item.lName.substring(0, 1);

    // if two subjects exist , it's 60 minutes otherwise just 30 minutes

    const subjectNum: number = item.subjects.length;
    const studentTime: string[] = [...daySchedule];

    // assuming I got passed a day, start time is either first index or second
    // start time is stored as a value between 1 and 8, I use that as an index
    if (item.days[0] === dayPassed) {
      // if there are 2 subjects, total time = 1 hour so we mark 2 spots
      if (subjectNum === 2) {
        studentTime[+item.startTime[0]] = studentName;
        studentTime[+item.startTime[0] + 1] = studentName;
      }
      // we mark just one spot
      else {
        studentTime[+item.startTime[0]] = studentName;
      }
    }
    // same logic as above but we use the secondIndex
    else if (item.days[1] === dayPassed) {
      // if there are 2 subjects, total time = 1 hour so we mark 2 spots
      if (subjectNum === 2) {
        studentTime[+item.startTime[1]] = studentName;
        studentTime[+item.startTime[1] + 1] = studentName;
      }
      // we mark just one spot
      else {
        studentTime[+item.startTime[1]] = studentName;
      }
    }
    // if no days match, we don't want to add the student as it'll be an empty addition so we move on
    else {
      continue;
    }

    // we need to get increment the id
    studentTime[0] = day + "" + count++;
    // console.log(studentTime);
    const oneSchedule = createScheduleData(
      studentTime[0],
      studentTime[1],
      studentTime[2],
      studentTime[3],
      studentTime[4],
      studentTime[5],
      studentTime[6],
      studentTime[7],
      studentTime[8]
    );

    // let's add that student's data
    rowsData.push(oneSchedule);
  }
  return rowsData;
}

// For each time slot I will have a string that is either the student's name or an empty string
function createScheduleData(
  id: string,
  two3: string,
  three: string,
  three3: string,
  four: string,
  four3: string,
  five: string,
  five3: string,
  six: string
) {
  return { id, two3, three, three3, four, four3, five, five3, six };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 700
    }
  })
);

// interface IDayScheduleProps {
//   days: string;
//   postData: [];
// }

interface IDayScheduleProps {
  d: string;
  pd: {};
}

// useEffect(() => {
//   axios
//     .get("http://localhost:4000/students/")
//     .then(res => {
//       // this.setState({
//       //   students: res.data
//       // });
//       console.log(res.data + "   end of the data");
//     })
//     .catch(error => {
//       console.log(error + " axios error");
//     });
// }, []);

// I use React.memo to avoid rerendering the function every single I click elsewhere and go back
// that behaviour leads to poor performance
const dayschedule: FunctionComponent<IDayScheduleProps> = function CustomizedTables(
  props
) {
  const classes = useStyles({});

  const rowsData = parseSchedule(props.d);
  // if (typeof props.days === "undefined") {
  // }
  const data = props.pd;
  const values = Object.values(data);
  let misc = "not rendered";
  for (let i = 0; i < props.pd.length; i++) {
    let current = props.pd[i];
    misc = current.fname;
    console.log(current);
  }
  //console.log(values);

  //console.log(props.pd);

  //console.log(props.postData);
  // const [rowsData, setRows] = useState([]);
  // setRows(parseSchedule(props.days));
  // console.log(props.days);
  // console.log(rowsData);
  // something to think about is that Friday time may be 6pm so i would need to change the TableRow a bit (selection)

  return misc !== "not rendered" ? (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>2 : 30</StyledTableCell>
            <StyledTableCell>3 : 00</StyledTableCell>
            <StyledTableCell>3 : 30</StyledTableCell>
            <StyledTableCell>4 : 00</StyledTableCell>
            <StyledTableCell>4 : 30</StyledTableCell>
            <StyledTableCell>5 : 00</StyledTableCell>
            <StyledTableCell>5 : 30</StyledTableCell>
            <StyledTableCell>6 : 00</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData.map(row => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.two3}
              </StyledTableCell>
              <StyledTableCell>{row.three}</StyledTableCell>
              <StyledTableCell>{row.three3}</StyledTableCell>
              <StyledTableCell>{row.four}</StyledTableCell>
              <StyledTableCell>{row.four3}</StyledTableCell>
              <StyledTableCell>{row.five}</StyledTableCell>
              <StyledTableCell>{row.five3}</StyledTableCell>
              <StyledTableCell>{row.six}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  ) : (
    <h2>
      {props.d} Loading..{misc}
    </h2>
  );
};

export default dayschedule;
