import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "REACT_APP_", // default: VITE_
  server: {
    port: 3000,
  },
  plugins: [react()],
});

