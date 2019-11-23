import React from "react";
import { render } from "react-dom";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import NavBar from "./components/navbar";
import AddStudent from "./components/addstudent";
import GroupedButtons from "./components/buttongroups";

const App = () => {
  return (
    <div id="menuSelection">
      <NavBar />

      <br />
      <AddStudent />
      <Button variant="contained" color="primary">
        Submit🚀
      </Button>
    </div>
  );
};

render(<App />, document.getElementById("root"));
