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

const rootElement = document.getElementById("root");

if (rootElement) {
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
