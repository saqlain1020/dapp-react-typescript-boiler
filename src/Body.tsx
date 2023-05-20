import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Default from "./layouts/Default";
import Test from "./pages/Test/Test";
import useDecimals from "./hooks/useDecimals";
import useBalances from "./hooks/useBalances";

interface IProps {}

const Body: React.FC<IProps> = () => {
  const { reloadDecimals } = useDecimals();
  const { reloadBalances } = useBalances();

  useEffect(() => {
    reloadDecimals();
  }, [reloadDecimals]);

  useEffect(() => {
    reloadBalances();
    const int = setInterval(() => {
      reloadBalances();
    }, 30000); // 30 seconds refetch interval

    return () => {
      clearInterval(int);
    };
  }, [reloadBalances]);

  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Route>
    </Routes>
  );
};

export default Body;
