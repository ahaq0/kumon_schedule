import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import GroupedButtons from "./buttongroups";
import kumonLogo from "../../media/kumon.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(3)
  },
  title: {
    paddingRight: "10px"
  },
  label: {
    paddingTop: "20px"
  }
}));

const NavBar = () => {
  const classes = useStyles({});

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <img src={kumonLogo} alt="logo.png" className={classes.title} />
          <Typography align="left" variant="h6" className={classes.title}>
            Kumon
          </Typography>
          <GroupedButtons />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
