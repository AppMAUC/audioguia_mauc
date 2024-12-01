import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/reset.css";
import "./styles/global.css";
import AuthProvider from "./features/Admin/context/AuthProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFound/NotFoundPage.tsx";
import { adminRoutes } from "./features/Admin/adminRoutes.tsx";
import Home from "./pages/Home/Home.tsx";
import { ThemeProvider } from "./features/Theme/ThemeProvider.tsx";
import Layout from "./components/ui/Layout.tsx";
import { artistRoutes } from "./features/Artists/artistRoutes.tsx";
import { artWorkRoutes } from "./features/ArtWorks/artWorkRoutes.tsx";
import { expositionRoutes } from "./features/Expositions/expositionRoutes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Search from "./pages/Search/index.tsx";
import Arquivo from "./pages/Information/Arquivo.tsx";
import Biblioteca from "./pages/Information/Biblioteca.tsx";
import Nucleos from "./pages/Information/Nucleos.tsx";
import About from "./pages/Information/About.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/arquivo",
          element: <Arquivo />,
        },
        {
          path: "/biblioteca",
          element: <Biblioteca />,
        },
        {
          path: "/nucleos",
          element: <Nucleos />,
        },
        {
          path: "/about",
          element: <About />,
        },
        ...artistRoutes,
        ...artWorkRoutes,
        ...expositionRoutes,
      ],
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
  <QueryClientProvider client={queryClient}>
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
  </QueryClientProvider>
  // </StrictMode>
);
