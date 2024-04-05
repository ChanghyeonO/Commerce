import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import router from "./router/routerConfig";
import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { SortProvider } from "./contexts/SortContext";

import GlobalStyles from "./styles/GlobalStyles";
import GlobalFont from "./styles/GlobalFont";

const queryClient = new QueryClient();

function handleHashbangInUrl() {
  if (window.location.hash.startsWith("#!/")) {
    const newPath = window.location.hash.substring(3);
    window.history.replaceState(null, "", newPath);
  }
}

const rootElement = document.getElementById("root");

if (rootElement) {
  handleHashbangInUrl();

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <SortProvider>
            <GlobalStyles />
            <GlobalFont />
            <RouterProvider router={router} />
          </SortProvider>
        </UserProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
