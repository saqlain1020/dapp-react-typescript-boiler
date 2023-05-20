import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Theme } from "@mui/material";
import { erc20Abi } from "src/assets/abis/erc20";
import useWallet from "src/hooks/useWallet";
import { getContract } from "wagmi/actions";
import { awaitTransaction, toWei } from "src/utils/common";
import { notifyError, notifySuccess } from "src/api/notifications";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface IProps {}

const Test: React.FC<IProps> = () => {
  const classes = useStyles();
  const { currentAddress, walletClient } = useWallet();

  const fn = async () => {
    if (!currentAddress) return;
    const contract = getContract({
      address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      abi: erc20Abi,
      walletClient,
    });
    // const res = await contract.simulate.transfer(["0x5b5Dc6A42FB4e8C1a71E6164584D18cCEBD65725", toWei("0.5", 6)]);
    const res = await awaitTransaction(
      contract.write.transfer(["0x5b5Dc6A42FB4e8C1a71E6164584D18cCEBD65725", toWei("1000", 6)])
    );
    // const balances = new Array(150).fill(0).map((_, i) => contract.read.balanceOf([currentAddress]));
    // const balance = await Promise.all(balances);
    if (res.status) {
      notifySuccess("Success", "Transfer successful");
    } else {
      notifyError("Error", res.error);
    }
  };

  return (
    <div className={classes.root}>
      Test Page
      <Button onClick={fn}>Transfer</Button>
    </div>
  );
};

export default Test;
