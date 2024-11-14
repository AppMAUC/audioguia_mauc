import { createRoot } from "react-dom/client";
import "./styles/global.css";
import AuthProvider from "./features/Admin/context/AuthProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFound/NotFoundPage.tsx";
import { adminRoutes } from "./features/Admin/adminRoutes.tsx";
import Home from "./pages/Home/Home.tsx";
import { ThemeProvider } from "./features/Theme/ThemeProvider.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFoundPage />,
    },
    ...adminRoutes,
  ],
  {
    future: {
      v7_skipActionErrorRevalidation: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
    },
  }
);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <AuthProvider>
    <ThemeProvider>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </ThemeProvider>
  </AuthProvider>
  // </StrictMode>
);
