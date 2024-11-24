import Layout from "../../components/ui/Layout";
import Artists from "./pages/Artists";
import ArtistDashboard from "./pages/Dashboard";

export const artistRoutes = [
  {
    path: "/artists",
    element: <Artists />,
  },
  {
    path: "/artists/:id",
    element: <Artists />,
  },
];

export const adminArtistRoutes = [
  {
    path: "artists",
    element: (
      <Layout>
        <ArtistDashboard />
      </Layout>
    ),
  },
  {
    path: "artists/new",
    element: (
      <Layout>
        <h1>new</h1>
      </Layout>
    ),
  },
  {
    path: "artists/:id",
    element: (
      <Layout>
        <h1>:id</h1>
      </Layout>
    ),
  },
];
