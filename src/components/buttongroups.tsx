import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Router, Link } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
// to do pass the styles from the top, basicall ymake it once and then just pass it around

const useStyles = makeStyles({
  label: {
    paddingTop: "15px"
  }
});

export default function GroupedButtons() {
  // there is a bug in Typescript so workaround is to pass an empty object
  const classes = useStyles({});

  return (
    <Grid
      container={true}
      spacing={0}
      justify="flex-start"
      alignItems="flex-end"
      direction="row"
    >
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
    </Grid>
  );
}
