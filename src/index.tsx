import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import GlobalStyles from "./styles/GlobalStyles.ts";
import GlobalFont from "./styles/GlobalFont.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <GlobalStyles />
      <GlobalFont />
      <App />
    </Router>
  </React.StrictMode>,
);
