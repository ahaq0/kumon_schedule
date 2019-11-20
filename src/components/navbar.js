import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import GroupedButtons from "../components/buttongroups";

import kumonLogo from "../../media/kumon.png";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(3)
  },
  title: {
    paddingRight: "5px"
  },
  label: {
    paddingTop: "20px"
  }
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <img src={kumonLogo} alt="logo.png" className={classes.title} />
          <Typography align="left" variant="h6" className={classes.title}>
            Kumon
          </Typography>
          <GroupedButtons />
          <Button color="inherit" className={classes.label}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
