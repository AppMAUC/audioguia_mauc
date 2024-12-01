import Layout from "../../components/ui/Layout";
import Dashboard from "./pages/Dashboard";
import Edit from "./pages/Edit";
import Exposition from "./pages/Exposition";
import Expositions from "./pages/Expositions";
import Register from "./pages/Register";

export const expositionRoutes = [
  {
    path: "/expositions",
    element: <Expositions />,
  },
  {
    path: "/expositions/:id",
    element: <Exposition />,
  },
];

export const adminExpositionRoutes = [
  {
    path: "expositions",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "expositions/new",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: "expositions/:id",
    element: (
      <Layout>
        <Edit />
      </Layout>
    ),
  },
];
