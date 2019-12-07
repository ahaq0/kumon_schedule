import React from "react";
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

function handleSubmit() {
  // make a student object

  console.log(name);
  return;
}

const handleFNameChange = e => {
  console.log(e.target.value);
};

function Student(
  id: number,
  fName: string,
  lName: string,
  subjects: string[],
  days: string[],
  startTime: number[]
) {
  this.id = id;
  this.fName = fName;
  this.lName = lName;
  this.subjects = subjects;
  this.days = days;
  this.starTime = startTime;
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

export default function PaperSheet() {
  const classes = useStyles({});

  return (
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
              onChange={handleFNameChange}
            />
          </div>
          <div>
            <TextField
              id="lninput"
              className={classes.textField}
              label="Last Name"
              margin="normal"
            />
          </div>
          <div className={classes.checks}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Subjects</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox value="Math" />}
                  label="Math"
                />
                <FormControlLabel
                  control={<Checkbox value="Reading" />}
                  label="Reading"
                />
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Days</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox value="Tuesday" />}
                  label="Tuesday"
                />
                <FormControlLabel
                  control={<Checkbox value="Wednesday" />}
                  label="Wednesday"
                />
                <FormControlLabel
                  control={<Checkbox value="Friday" />}
                  label="Friday"
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
                defaultValue=""
                input={<Input id="grouped-native-select" />}
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
                defaultValue=""
                input={<Input id="grouped-native-select" />}
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
            <button className={classes.buttons} type="button">
              Clear🧹
            </button>
          </div>
        </Paper>
      </Grid>
    </form>
  );
}
