import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Router, Link } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
// to do pass the styles from the top, basicall ymake it once and then just pass it around

// I use this to determine whether the button is login or logout
import LoginContext from "./login-context";

const useStyles = makeStyles({
  label: {
    //paddingTop: "15px",
    paddingRight: "20px"
  },
  alignment: {}
});

export default function GroupedButtons() {
  // there is a bug in Typescript so workaround is to pass an empty object
  const classes = useStyles({});

  const [login, setLogin] = useContext(LoginContext);

  const [word, setWord] = useState("Login");
  function loginOrLogout() {
    if (login === true) {
      setWord("Logout");
    }
  }

  return (
    <Grid container={true}>
      <Grid item={true} xs={4}>
        {/* Left this empty on purpose to align things  */}
      </Grid>
      <Grid container={true} item={true} xs={4} justify="center">
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
      <Grid container={true} item={true} xs={4} justify="flex-end">
        <div>
          <Button
            component={Link}
            to="/login"
            className={classes.alignment}
            color="inherit"
            size="medium"
            variant="text"
          >
            {word}
          </Button>
        </div>
      </Grid>
    </Grid>
    // <div>
    //   <Grid container={true}>
    //     <Grid item xs={4}>
    //       {/* <h1>hi</h1> */}
    //     </Grid>
    //     <Grid container={true} item={true} justify="center" xs={4}>
    //       <div>
    //         <ButtonGroup
    //           variant="text"
    //           color="inherit"
    //           size="medium"
    //           className={classes.label}
    //         >
    //           <Button component={Link} to="/">
    //             ADD STUDENT
    //           </Button>
    //           <Button component={Link} to="/schedule">
    //             SCHEDULE
    //           </Button>
    //           <Button component={Link} to="/students">
    //             STUDENTS
    //           </Button>
    //         </ButtonGroup>
    //       </div>
    //     </Grid>
    //     <Grid container={true} item={true} justify="flex-end" xs={4}>
    //       <div>
    //         <ButtonGroup>
    //           <Button
    //             component={Link}
    //             to="/login"
    //             className={classes.alignment}
    //             color="inherit"
    //             size="medium"
    //             variant="text"
    //           >
    //             Login
    //           </Button>
    //         </ButtonGroup>
    //       </div>
    //     </Grid>
    //   </Grid>
    // </div>
  );
}
