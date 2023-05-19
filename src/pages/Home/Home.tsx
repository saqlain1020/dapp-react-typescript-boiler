import React from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

interface IProps {}

const Home: React.FC<IProps> = () => {
  return (
    <div>
      <h1>Root Page</h1>
      <TextField />
      <Link to="/test">Test</Link>
    </div>
  );
};

export default Home;
