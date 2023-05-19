import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Default from "./layouts/Default";
import Test from "./pages/Test/Test";

interface IProps {}

const Body: React.FC<IProps> = () => {
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
