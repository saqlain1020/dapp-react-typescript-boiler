import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { setUpNotifications } from "reapop";
import store, { persistor } from "./state";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import Notifications from "./components/Notifications/Notifications.tsx";

// Configuration for toast notifications
setUpNotifications({
  defaultProps: {
    position: "top-right",
    dismissible: true,
    showDismissButton: true,
    dismissAfter: 3000,
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Notifications />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
