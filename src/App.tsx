// import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Body from "./Body";
import lightTheme from "./config/theme/light";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
// import viteLogo from "/vite.svg";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={lightTheme}>
            <Body />
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

