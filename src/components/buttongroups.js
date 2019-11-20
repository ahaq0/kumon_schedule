import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
// to do pass the styles from the top, basicall ymake it once and then just pass it around

const useStyles = makeStyles(theme => ({
  label: {
    paddingTop: "15px"
  }
}));

export default function GroupedButtons() {
  const classes = useStyles();

  return (
    <Grid
      container
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
        <Button>ADD STUDENT</Button>
        <Button>SCHEDULE</Button>
        <Button>STUDENTS</Button>
      </ButtonGroup>
    </Grid>
  );
}
