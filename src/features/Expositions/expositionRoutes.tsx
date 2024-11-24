import Layout from "../../components/ui/Layout";
import ExpositionDashboard from "./pages/Dashboard";
import Exposition from "./pages/Exposition";

export const expositionRoutes = [
  {
    path: "/expositions",
    element: <Exposition />,
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
        <ExpositionDashboard />
      </Layout>
    ),
  },
  {
    path: "expositions/new",
    element: (
      <Layout>
        <h1>New Exposition</h1>
      </Layout>
    ),
  },
  {
    path: "expositions/:id",
    element: (
      <Layout>
        <Exposition />
      </Layout>
    ),
  },
];
