import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "../../components/ui/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { adminArtistRoutes } from "../Artists/artistRoutes";
import { adminExpositionRoutes } from "../Expositions/expositionRoutes";
import { adminArtWorkRoutes } from "../ArtWorks/artWorkRoutes";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Edit from "./pages/Edit";

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
            <Profile />
          </Layout>
        ),
      },
      {
        path: "profile/:id",
        element: (
          <Layout>
            <Edit />
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
    element: <ProtectedRoute allowedRole={1} />,
    children: [
      {
        path: "register",
        element: (
          <Layout>
            <Register />
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
    ],
  },
];
