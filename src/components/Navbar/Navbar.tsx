import React from "react";
import { makeStyles } from "@mui/styles";
import { AppBar, Theme, Typography } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "static",
    height: 70,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

interface IProps {}

const Navbar: React.FC<IProps> = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} sx={{ p: 2 }}>
      <div className={classes.container}>
        <Typography variant="h4">
          <b>Navbar</b>
        </Typography>
        <ConnectButton />
      </div>
    </AppBar>
  );
};

export default Navbar;
