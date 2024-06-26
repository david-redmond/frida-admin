import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MainListItems, SecondaryListItems } from "./listItems";
import Copyright from "./Copyright";
import { Helmet } from "react-helmet";
import ToastMessage from "./ToastMessage";
import { Logout } from "@mui/icons-material";
import Routes from "../routes";
import useToken from "../hooks/useToken";
import { useSelector } from "react-redux";
import { RootState } from "../store/interfaces";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function PageWrapper(props: any) {
  const [open, setOpen] = React.useState(true);

  const pageTitle = useSelector((state: RootState) => state.ui.pageTitle);
  const activeCompanyName = useSelector((state: RootState) => {
    const { activeCompanyId } = state.user;
    // @ts-ignore
    const company = state.associatedCompanies.find(
      (company) => company.id === activeCompanyId,
    );
    return !!company?.name ? company.name : "";
  });
  const hasAssociatedCompanies = useSelector(
    (state: RootState) => state.associatedCompanies.length > 0,
  );

  const { deleteToken } = useToken();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSignOut = () => {
    deleteToken();
    window.location.href = Routes.home;
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Project Frida | Admin Panel`}</title>
      </Helmet>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {pageTitle}
          </Typography>
          <Typography variant="caption" color="inherit" noWrap sx={{ mr: 1 }}>
            {activeCompanyName}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleSignOut}>
            <Badge badgeContent={0} color="secondary">
              <Logout />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
            background: '#1976d2'
          }}
        >
          <div className={"Logo"}>
            Project Frida
          </div>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon sx={{color: 'white'}}/>
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <MainListItems />
          <Divider sx={{ my: 1 }} />
          {hasAssociatedCompanies && <SecondaryListItems />}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {props.children}
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
          }}
        >
          <Container maxWidth="sm">
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </Box>
      </Box>
      <ToastMessage />
    </Box>
  );
}
