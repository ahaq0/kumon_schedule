import React from "react";

import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

// This component will be rendered if a user has not signed in yet.

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500
  }
});

export default function notLoggedIn() {
  const classes = useStyles({});

  return (
    <div>
      <Typography variant="h5" gutterBottom={true}>
        Please log in <CircularProgress />
      </Typography>
    </div>
  );
}
