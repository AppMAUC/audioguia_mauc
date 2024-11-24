import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "../../components/ui/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { adminArtistRoutes } from "../Artists/artistRoutes";
import { adminExpositionRoutes } from "../Expositions/expositionRoutes";
import { adminArtWorkRoutes } from "../ArtWorks/artWorkRoutes";

export const adminRoutes = [
  {
    path: "/admin",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: (
          <Layout>
            <Dashboard />
          </Layout>
        ),
      },
      {
        path: "profile",
        element: (
          <Layout>
            <h1>Profile</h1>
          </Layout>
        ),
      },
      ...adminArtistRoutes,
      ...adminExpositionRoutes,
      ...adminArtWorkRoutes,
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute allowedRole={2} />,
    children: [
      {
        path: "register",
        element: (
          <Layout>
            <h1>Register</h1>
          </Layout>
        ),
      },
      {
        path: "all",
        element: (
          <Layout>
            <AdminDashboard />
          </Layout>
        ),
      },
      {
        path: "profile/:id",
        element: (
          <Layout>
            <h1>:id</h1>
          </Layout>
        ),
      },
    ],
  },
];
