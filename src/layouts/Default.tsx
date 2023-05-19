import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Default = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Default;
