import React, { useState } from "react";
import { render } from "react-dom";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import NavBar from "./components/navbar";
import AddStudent from "./components/addstudent";
import GroupedButtons from "./components/buttongroups";
import Students from "./components/students";
import Schedule from "./components/schedule";
import Login from "./components/login";
import { Router, RouteComponentProps } from "@reach/router";
import CssBaseline from "@material-ui/core/CssBaseline";

import LoginContext from "./components/login-context";

const App = () => {
  // Hook
  const loginHook = useState(false); // Default value

  return (
    <LoginContext.Provider value={loginHook}>
      <div id="menuSelection">
        <CssBaseline />
        <NavBar />
        <Router>
          <RouterPage path="/" pageComponent={<AddStudent />} />
          <RouterPage path="/schedule" pageComponent={<Schedule />} />
          <RouterPage path="/studentz" pageComponent={<Students />} />
          <RouterPage path="/login" pageComponent={<Login />} />
        </Router>
      </div>
    </LoginContext.Provider>
  );
};
// got this piece of code from https://github.com/reach/router/issues/141 idea is to make a wrapper
// component for each component to avoid typescript from complaining
const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
render(<App />, document.getElementById("root"));
