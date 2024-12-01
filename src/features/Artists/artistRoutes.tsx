import Layout from "../../components/ui/Layout";
import Artist from "./pages/Artist";
import Artists from "./pages/Artists";
import Dashboard from "./pages/Dashboard";
import Edit from "./pages/Edit";
import Register from "./pages/Register";

export const artistRoutes = [
  {
    path: "/artists",
    element: <Artists />,
  },
  {
    path: "/artists/:id",
    element: <Artist />,
  },
];

export const adminArtistRoutes = [
  {
    path: "artists",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "artists/new",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: "artists/:id",
    element: (
      <Layout>
        <Edit />
      </Layout>
    ),
  },
];
