import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExistingCompany from "./ExistingCompany";
import CreateNewCompany from "./CreateNewCompany";
import { IUser, RootState } from "../../store/interfaces";
import { useSelector } from "react-redux";
import {Helmet} from "react-helmet";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const user: IUser | null = useSelector((state: RootState) => state.user.user);

  return (
    <Box sx={{ width: "100%" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Project Frida Admin | Create Company`}</title>
      </Helmet>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Create a new company profile" {...a11yProps(0)} />
          <Tab
            label="Connect to an existing company"
            {...a11yProps(1)}
            autoFocus
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CreateNewCompany user={user} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ExistingCompany />
      </CustomTabPanel>
    </Box>
  );
}
