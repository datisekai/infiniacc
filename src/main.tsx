import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.scss";
import router from "./routes/index.tsx";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-modern-drawer/dist/index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./constants/index.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        success: {
          style: {
            background: "#131720",
            border: "1px solid #53FD8F",
            color: "white",
          },
        },
        error: {
          style: {
            background: "#131720",
            border: "1px solid #53FD8F",
            color: "white",
          },
        },
      }}
    />
  </GoogleOAuthProvider>
);
