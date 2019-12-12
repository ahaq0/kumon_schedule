import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DaySchedule from "./dayschedule";
import axios from "axios";

interface ITabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

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

  // let postData = axios
  //   .get("http://localhost:4000/students/")
  //   .then(res => {
  //     console.log(res.data);
  //   })
  //   .catch(error => {
  //     console.log(error + " axios error");
  //   });
  // let post;

  function getData() {
    axios
      .get("http://localhost:4000/students/")
      .then(res => {
        console.log(res.data);
        setPostData(res.data);
      })
      .catch(error => {
        console.log(error + " axios error");
      });
  }
  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    console.log(newValue);
    if (newValue === 0) {
      setDay("tuesday");
    } else if (newValue === 1) {
      setDay("wednesday");
    } else if (newValue === 2) {
      setDay("friday");
    }
    console.log(day);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          {/* what to do with drafts trash spam href */}
          <LinkTab label="Tuesday" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Wednesday" href="/trash" {...a11yProps(1)} />
          <LinkTab label="Friday" href="/spam" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      {/* <TabPanel value={value} index ={}> */}
      {/* <DaySchedule d={day} /> */}
      {/* </TabPanel> */}
      <DaySchedule d={day} pd={postData} />

      {/* <DaySchedule props : {d :day } /> */}

      {/* <TabPanel value={value} index={1}> */}
      {/* <DaySchedule days={"wednesday"} {...postData} /> */}
      {/* </TabPanel> */}
      {/* <TabPanel value={value} index={2}> */}
      {/* <DaySchedule days={"friday"} {...postData} /> */}
      {/* </TabPanel> */}
    </div>
  );
}
