import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Skeleton from "@material-ui/lab/Skeleton";

import Grid, { GridSpacing } from "@material-ui/core/Grid";

// The purpose of this component is to render a generic animation for all users who have not signed in yet

// Since there is no CSS vh in React, I find out the current window height + width manually whenever it changesg to resize my skeleton accordingly.
// Found this idea from https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs

function getWindowDimensions() {
  const { innerWidth: currentHeight, innerHeight: currentWidth } = window;
  return {
    currentHeight,
    currentWidth
  };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500
    //
  }
});

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export default function notLoggedIn() {
  const { currentHeight, currentWidth } = useWindowDimensions();

  console.log(
    "CUrrent height is " + currentHeight + " currentWidth is " + currentWidth
  );
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        {/* It may look arbritrary but I found that length to eliminate scrolling on mobile*/}
        <Skeleton variant="rect" height={538} width={500}>
          <Typography variant="h5" gutterBottom={false}>
            Please log in
          </Typography>
        </Skeleton>
      </Grid>
    </Grid>
  );
}
