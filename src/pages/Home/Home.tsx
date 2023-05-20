import React from "react";
import { TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useWallet from "src/hooks/useWallet";

interface IProps {}

const Home: React.FC<IProps> = () => {
  const { balance, publicClient, walletClient, displayAccount, currentAddress } = useWallet();
  console.log(publicClient, walletClient);
  return (
    <div>
      <h1>Root Page</h1>
      <TextField />
      <Link to="/test">Test</Link>
      <Typography>
        <b>Balance:</b> {balance?.formatted}
      </Typography>
      <Typography>
        <b>Current Wallet:</b> {currentAddress}
      </Typography>
      <Typography>
        <b>Current Wallet:</b> {displayAccount}
      </Typography>
    </div>
  );
};

export default Home;
