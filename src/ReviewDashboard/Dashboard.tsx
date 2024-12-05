import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
// import Avatar from "@mui/material/Avatar";
import DIReview from "../DIReview/D&IReview";
import LodgeRequest from "../DIReview/LodgeRequest";
import Committee from "../DIReview/Committee";
import { Step, StepLabel, Stepper } from "@mui/material";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor:"#004CAC"
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(5)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor:"#004CAC"
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#FFF",
  color: "#004CAC",
  variants: [
    {
      props: { open: true },
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: { open: true },
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: { open: false },
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));
const steps = ["DashBoard", "D&I Review", "Committee Review"];

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
//   const [userName] = React.useState("John Doe");
  const [selectedComponent, setSelectedComponent] = React.useState("DashBoard"); // Default component

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (component: string) => {
    setSelectedComponent(component); // Update the selected component
    setOpen(false); // Optionally close the drawer
  };
  const activeStep = steps.indexOf(selectedComponent);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{ marginRight: 2 }, open && { display: "none" }]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Research Flow System
          </Typography>
          <Box sx={{ flexGrow: 2 }} />
          <IconButton color="inherit">
            <EmailIcon />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          {/* <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ marginRight: 1 }}>
              Hello
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 4.5, marginLeft: -9 }}>
              {userName}
            </Typography>
            <Avatar
              sx={{
                cursor: "pointer",
                bgcolor: "#E1255A",
                width: 35,
                height: 35,
                marginRight: 0.5,
              }}
            >
              {userName.charAt(0)}
            </Avatar> */}
            {/* <ArrowDropDownIcon component="svg" sx={{ cursor: "pointer" }} />
          </Box> */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{color:"white"}}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{backgroundColor: "#004CAC"}}/>
        <List>
          {[
            "DashBoard",
            "D&I Review",
            "Committee Review",
            // "Change Request",
            // "Project Closure",
          ].map((text) => (
            <ListItem
              key={text}
              disablePadding
              sx={{
                display: "block",
                backgroundColor: "#004CAC",
                color: "white",
              }}
            >
              <ListItemButton
                onClick={() => handleMenuItemClick(text)} // Handle menu item click
                sx={[
                  { minHeight: 100, px: 0.5 },
                  open
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" },
                  selectedComponent === text && {
                    backgroundColor: "#003578",
                    color: "white",
                  }, // Highlight selected item
                ]}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: "center", color: "white",paddingLeft:"5px" },
                    open ? { mr: 2 } : { mr: "auto" },
                  ]}
                >
                  {text === "DashBoard" ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box sx={{ width: "100%", mb: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {/* <Typography variant="h5" sx={{ mb: 2 }}>
          Current Component: {selectedComponent}
        </Typography> */}
        {selectedComponent === "DashBoard" && <LodgeRequest />}
        {selectedComponent === "D&I Review" && <DIReview />}
        {selectedComponent === "Committee Review" && <Committee />}
        {/* {selectedComponent === 'Change Request' && <CommitteeReview />} */}
      </Box>
    </Box>
  );
}
