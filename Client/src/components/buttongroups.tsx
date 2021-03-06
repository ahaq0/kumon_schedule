import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Router, Link, navigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
// to do pass the styles from the top, basicall ymake it once and then just pass it around

// I use this to determine whether the button is login or logout
import LoginContext from "./login-context";

const useStyles = makeStyles({
  label: {
    // paddingTop: "15px",
    paddingRight: "20px"
  },
  alignment: {}
});

export default function GroupedButtons() {
  // there is a bug in Typescript so workaround is to pass an empty object
  const classes = useStyles({});

  function logout() {
    navigate(`/`);
    location.reload();
  }

  return (
    <Grid container={true}>
      <Grid item={true} xs={4}>
        {/* Left this empty on purpose to align things  */}
      </Grid>
      <Grid container={true} item={true} xs={3} justify="space-evenly">
        <div>
          <ButtonGroup
            variant="text"
            color="inherit"
            size="medium"
            className={classes.label}
          >
            <Button component={Link} to="/">
              ADD STUDENT
            </Button>
            <Button component={Link} to="/schedule">
              SCHEDULE
            </Button>
            <Button component={Link} to="/students">
              STUDENTS
            </Button>
          </ButtonGroup>
        </div>
      </Grid>

      <Grid container={true} item={true} xs={5} justify="flex-end">
        <div>
          <Button
            component={Link}
            to="/login"
            className={classes.alignment}
            color="inherit"
            size="medium"
            variant="text"
          >
            Login
          </Button>
        </div>
        <Grid container={true} item={true} xs={2} justify="flex-end">
          <div>
            <Button
              onClick={logout}
              component={Link}
              to="/"
              className={classes.alignment}
              color="inherit"
              size="medium"
              variant="text"
            >
              Logout
            </Button>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
