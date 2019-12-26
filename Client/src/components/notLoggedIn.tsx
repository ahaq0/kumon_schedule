import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Skeleton from "@material-ui/lab/Skeleton";

import Grid, { GridSpacing } from "@material-ui/core/Grid";

// The purpose of this component is to render a generic animation for all users who have not signed in yet

// From an Idea I had before https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs

export default function notLoggedIn() {
  return (
    <Grid container={true} justify="center" alignContent="center">
      <Grid item={true}>
        {/* It may look arbritrary but I found that length to eliminate scrolling on mobile*/}
        <Skeleton variant="rect" height={500} width={500}>
          <Typography variant="h5" gutterBottom={false}>
            Please log in
          </Typography>
        </Skeleton>
      </Grid>
    </Grid>
  );
}
