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

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2)
    },
    button: {
      alignContent: "left"
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    formControl: {
      margin: theme.spacing(3),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
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
    grid: {}
  })
);

export default function PaperSheet() {
  const classes = useStyles({});

  // Default states

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={1}
      justify="space-evenly"
      className={classes.grid}
    >
      <Paper className={classes.root}>
        <div>
          <TextField
            id="standard-basic-1"
            className={classes.textField}
            label="First Name"
            margin="normal"
          />
        </div>
        <div>
          <TextField
            id="standard-basic-2"
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

        <h1></h1>
        <div>
          <Typography variant="h6" component="h3">
            Start Time
          </Typography>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-native-select">Day 1</InputLabel>
            <Select
              native
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
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-native-select">Day 2</InputLabel>
            <Select
              native
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
      </Paper>
    </Grid>
  );
}
