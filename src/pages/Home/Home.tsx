import React from "react";
import { Container, Typography, ListItemText, ListItem, Button } from "@mui/material";
import { Link } from "react-router-dom";
import useWallet from "src/hooks/useWallet";
import useBalances from "src/hooks/useBalances";
import useDecimals from "src/hooks/useDecimals";
import { toEth } from "src/utils/common";
import useNotify from "src/hooks/useNotify";

interface IProps {}

const Home: React.FC<IProps> = () => {
  const { balance, displayAccount, currentAddress } = useWallet();
  const { balances } = useBalances();
  const { decimals } = useDecimals();
  const { notifySuccess, notifyError, notifyLoading, dismissNotifyAll } = useNotify();

  return (
    <Container maxWidth="xl">
      <h1>Root Page</h1>
      <Typography>
        <b>Balance:</b> {balance?.formatted}
      </Typography>
      <Typography>
        <b>Current Wallet:</b> {currentAddress}
      </Typography>
      <Typography>
        <b>Current Wallet:</b> {displayAccount}
      </Typography>
      <Link to="/test">Test</Link>
      <Typography variant="h5">Balances:-</Typography>
      {balances &&
        Object.entries(balances).map(([address, balance]) => (
          <ListItem key={address}>
            <ListItemText>
              {/* asd */}
              {/* <Typography key={address}> */}
              <b>Address:</b> {address} <b>Balance:</b> {toEth(balance, decimals && decimals[address])}
              {/* </Typography> */}
            </ListItemText>
          </ListItem>
        ))}
      <Typography variant="h5">Notifications</Typography>
      <Button
        variant="outlined"
        sx={{ mr: 2 }}
        onClick={() => {
          notifySuccess("Approving Token!", "Please wait...");
        }}
      >
        success
      </Button>

      <Button
        variant="outlined"
        sx={{ mr: 2 }}
        onClick={() => {
          notifyError("Error!", "Something went wrong...");
        }}
      >
        error
      </Button>

      <Button
        variant="outlined"
        sx={{ mr: 2 }}
        onClick={() => {
          notifyLoading("Approving!", "Please wait...");
        }}
      >
        loading
      </Button>
      <Button
        variant="outlined"
        sx={{ mr: 2 }}
        onClick={() => {
          notifyLoading("Approving!", "Please wait...", {
            buttons: [
              {
                name: "View",
                onClick: () => {},
              },
            ],
          });
        }}
      >
        btns
      </Button>
      <Button
        variant="outlined"
        sx={{ mr: 2 }}
        onClick={() => {
          dismissNotifyAll();
        }}
      >
        dismiss
      </Button>
    </Container>
  );
};

export default Home;
