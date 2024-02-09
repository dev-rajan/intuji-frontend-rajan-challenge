import React from "react";
import ReactDOM from "react-dom/client";

import App from "@src/App";
import { FirebaseProvider } from "@src/context/Firebase";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </React.StrictMode>
);
