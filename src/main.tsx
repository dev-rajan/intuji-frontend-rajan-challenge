import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import { FirebaseProvider } from "@src/context/Firebase";
import { routeTree } from "@src/routeTree.gen";
import { theme } from "@src/theme/appTheme";

import "@src/main.css";

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer />
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme}>
        <FirebaseProvider>
          <RouterProvider router={router} />
        </FirebaseProvider>
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
