import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface IProps {}

const Test: React.FC<IProps> = () => {
  const classes = useStyles();

  return <div className={classes.root}>Test Page</div>;
};

export default Test;
