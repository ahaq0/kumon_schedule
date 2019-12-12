import React from "react";
import { render } from "react-dom";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import NavBar from "./components/navbar";
import AddStudent from "./components/addstudent";
import GroupedButtons from "./components/buttongroups";
import Students from "./components/students";
import Schedule from "./components/schedule";
import { Router, RouteComponentProps } from "@reach/router";

const App = () => {
  return (
    <div id="menuSelection">
      <NavBar />

      <Router>
        <RouterPage path="/" pageComponent={<AddStudent />} />

        <RouterPage path="/schedule" pageComponent={<Schedule />} />
        <RouterPage path="/students" pageComponent={<Students />} />
      </Router>
    </div>
  );
};

// got this piece of code from https://github.com/reach/router/issues/141 idea is to make a wrapper
// component for each component to avoid typescript from complaining
const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
render(<App />, document.getElementById("root"));
