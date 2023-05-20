import React from "react";
import { Container, Typography, List, ListItemText, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import useWallet from "src/hooks/useWallet";
import useBalances from "src/hooks/useBalances";
import useDecimals from "src/hooks/useDecimals";
import { toEth } from "src/utils/common";

interface IProps {}

const Home: React.FC<IProps> = () => {
  const { balance, displayAccount, currentAddress } = useWallet();
  const { balances } = useBalances();
  const { decimals } = useDecimals();

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
      <List></List>
      {balances &&
        Object.entries(balances).map(([address, balance]) => (
          <ListItem>
            <ListItemText>
              {/* asd */}
              {/* <Typography key={address}> */}
              <b>Address:</b> {address} <b>Balance:</b> {toEth(balance, decimals && decimals[address])}
              {/* </Typography> */}
            </ListItemText>
          </ListItem>
        ))}
    </Container>
  );
};

export default Home;
