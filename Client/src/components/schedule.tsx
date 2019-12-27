import React, { useEffect, useContext } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DaySchedule from "./dayschedule";
import axios from "axios";
import loginContext from "./login-context";
import Loading from "./notLoggedIn";

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

function LinkTab(props: ILinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

interface ILinkTabProps {
  label?: string;
  href?: string;
}

export default function NavTabs() {
  const classes = useStyles({});
  const [value, setValue] = React.useState(0);
  const [day, setDay] = React.useState("tuesday");

  const [postData, setPostData] = React.useState({});

  const [loginHook] = useContext(loginContext);

  function getData() {
    axios
      .get("/students/")
      .then(res => {
        console.log(res.data);
        setPostData(res.data);
      })
      .catch(error => {
        console.log(error + " axios error");
      });
  }

  useEffect(() => {
    // Only fetch data if we're logged in (due to security concerns), otherwise don't.
    if (loginHook) {
      getData();
    }
  }, []);

  // Given a change in day, I render the schedule differently
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      setDay("tuesday");
    } else if (newValue === 1) {
      setDay("wednesday");
    } else if (newValue === 2) {
      setDay("friday");
    }
  };

  return loginHook ? (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Tuesday" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Wednesday" href="/trash" {...a11yProps(1)} />
          <LinkTab label="Friday" href="/spam" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      {/* I just reuse this component to display different days instead of creating  / loading 3 components */}
      <DaySchedule d={day} pd={postData} />
    </div>
  ) : (
    <Loading />
  );
}
