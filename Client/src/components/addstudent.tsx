import React, { useState, useReducer, useContext } from "react";
import ReactDOM from "react-dom";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

// for menu item or drawer below

import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";

// For sending HTTP request
import axios from "axios";

import loginContext from "./login-context";
import Loading from "./notLoggedIn";

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

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: theme.spacing(5, 5)
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    formControl: {
      margin: theme.spacing(3),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      alignContent: "center"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
      alignContent: "left"
    },

    checks: {
      display: "flex"
    },
    timeFormControl: {
      margin: theme.spacing(3),
      minWidth: 500
    },
    buttons: { padding: 5, marginLeft: 10, backgroundColor: "inherit" },
    grid: {}
  })
);

const initialState = {
  fName: "",
  lName: "",
  subjects: "",
  days: "",
  startTime: ""
};

export default function PaperSheet() {
  const classes = useStyles({});

  // so state variable is called fname
  // function that updates it is
  // Since updating a state variable always replaces it vs merging it when using hooks vs a class
  // I separated hooks for each input

  // Potential improvement of using one state, https://stackoverflow.com/questions/54895883/reset-to-initial-state-with-react-hooks

  // Name
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  // Subjects
  const [math, setMath] = useState(false);
  const [reading, setReading] = useState(false);

  // Days
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [friday, setFriday] = useState(false);
  // Day times
  const [day1Time, setDay1Time] = useState("");
  const [day2Time, setDay2Time] = useState("");

  // To determine whether they are logged in
  const [loginHook, setLoginHook] = useContext(loginContext);
  const a = false;

  const handleReset = () => {
    console.log("Status of login is " + loginHook);
    setFname("");
    setLname("");
    setMath(false);
    setReading(false);
    setTuesday(false);
    setWednesday(false);
    setFriday(false);
    setDay1Time("");
    setDay2Time("");
  };

  const handleSubmit = (event: React.ChangeEvent<{}>) => {
    event.preventDefault();

    // Converting bool property of subjects and days to text for student object
    const subjectStrings = [];
    if (math === true) {
      subjectStrings.push("Math");
    }
    if (reading === true) {
      subjectStrings.push("Reading");
    }

    const dayStrings = [];
    if (tuesday === true) {
      dayStrings.push("tuesday");
    }
    if (wednesday === true) {
      dayStrings.push("wednesday");
    }
    if (friday === true) {
      dayStrings.push("friday");
    }

    const startTime = [];
    // default is empty string
    if (day1Time !== "") {
      startTime.push(+day1Time);
    }

    if (day2Time !== "") {
      startTime.push(+day2Time);
    }

    // Create a new student
    const newStudent = new Student(
      fname,
      lname,
      subjectStrings,
      dayStrings,
      startTime
    );

    // Add student to database
    axios
      //.post("http://localhost:4000/students/create-student", newStudent)
      .post("/students/create-student", newStudent)

      .then(res => console.log(res.data));

    const copy = {
      name: "s",
      email: "a@gmai",
      rollno: "1"
    };

    alert(`${fname} ${lname} added successfully!`);

    // This will reset the state
    handleReset();
  };

  const handleDaySubject = (event: boolean, type: string) => {
    if (event === true) {
      switch (type) {
        case "math":
          setMath(true);
          return;
        case "reading":
          setReading(true);
          return;
        case "tuesday":
          setTuesday(true);
          return;
        case "wednesday":
          setWednesday(true);
          return;
        case "friday":
          setFriday(true);
          return;
      }
    } // if false, then make it return to default
    else {
      switch (type) {
        case "math":
          setMath(false);
          return;
        case "reading":
          setReading(false);
          return;
        case "tuesday":
          setTuesday(false);
          return;
        case "wednesday":
          setWednesday(false);
          return;
        case "friday":
          setFriday(false);
          return;
      }
    }
  };
  return loginHook ? (
    <form onSubmit={handleSubmit}>
      <Grid
        container={true}
        direction="column"
        alignItems="center"
        spacing={1}
        justify="space-evenly"
        className={classes.grid}
      >
        <Paper className={classes.root}>
          <div>
            <TextField
              id="fninput"
              className={classes.textField}
              label="First Name"
              margin="normal"
              value={fname}
              onChange={e => setFname(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="lninput"
              className={classes.textField}
              label="Last Name"
              margin="normal"
              value={lname}
              onChange={e => setLname(e.target.value)}
            />
          </div>
          <div className={classes.checks}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Subjects</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox value="Math" checked={math} />}
                  label="Math"
                  // Looks like this fix doesn't work https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
                  onChange={e =>
                    // setMath((event.target as HTMLTextAreaElement).checked)
                    handleDaySubject(
                      (event.target as HTMLInputElement).checked,
                      "math"
                    )
                  }
                />
                <FormControlLabel
                  control={<Checkbox value="Reading" checked={reading} />}
                  label="Reading"
                  onChange={e =>
                    // setReading((event.target as HTMLTextAreaElement).checked)
                    handleDaySubject(
                      (event.target as HTMLInputElement).checked,
                      "reading"
                    )
                  }
                />
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Days</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox value="Tuesday" checked={tuesday} />}
                  label="Tuesday"
                  onChange={e =>
                    // setMath((event.target as HTMLTextAreaElement).checked)
                    handleDaySubject(
                      (event.target as HTMLInputElement).checked,
                      "tuesday"
                    )
                  }
                />
                <FormControlLabel
                  control={<Checkbox value="Wednesday" checked={wednesday} />}
                  label="Wednesday"
                  onChange={e =>
                    // setMath((event.target as HTMLTextAreaElement).checked)
                    handleDaySubject(
                      (event.target as HTMLInputElement).checked,
                      "wednesday"
                    )
                  }
                />
                <FormControlLabel
                  control={<Checkbox value="Friday" checked={friday} />}
                  label="Friday"
                  onChange={e =>
                    // setMath((event.target as HTMLTextAreaElement).checked)
                    handleDaySubject(
                      (event.target as HTMLInputElement).checked,
                      "friday"
                    )
                  }
                />
              </FormGroup>
            </FormControl>

            {/*
        https://codesandbox.io/s/73ewv this is a demo of getting the checkboxes working correctly
        */}
          </div>
          <div>
            <Typography variant="h6" component="h3">
              Start Time
            </Typography>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="grouped-native-select">Day 1</InputLabel>
              <Select
                native={true}
                input={<Input id="grouped-native-select" />}
                onChange={e => setDay1Time(e.target.value + "")}
                value={day1Time}
                required={true}
              >
                <option value="" />
                <option value={1}>2 : 30 pm</option>
                <option value={2}>3 : 00 pm</option>
                <option value={3}>3 : 30 pm</option>
                <option value={4}>4 : 00 pm</option>
                <option value={5}>4 : 30 pm</option>
                <option value={6}>5 : 00 pm</option>
                <option value={7}>5 : 30 pm</option>
                <option value={8}>6 : 00 pm</option>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="grouped-native-select">Day 2</InputLabel>
              <Select
                native={true}
                input={<Input id="grouped-native-select" />}
                onChange={e => setDay2Time(e.target.value + "")}
                value={day2Time}
              >
                <option value="" />
                <option value={1}>2 : 30 pm</option>
                <option value={2}>3 : 00 pm</option>
                <option value={3}>3 : 30 pm</option>
                <option value={4}>4 : 00 pm</option>
                <option value={5}>4 : 30 pm</option>
                <option value={6}>5 : 00 pm</option>
                <option value={7}>5 : 30 pm</option>
                <option value={8}>6 : 00 pm</option>
              </Select>
            </FormControl>
          </div>
          <div>
            <button className={classes.buttons} type="submit">
              Submit🚀
            </button>
            <button
              className={classes.buttons}
              type="button"
              onClick={handleReset}
            >
              Clear🧹
            </button>
          </div>
        </Paper>
      </Grid>
    </form>
  ) : (
    <Loading />
  );
}
