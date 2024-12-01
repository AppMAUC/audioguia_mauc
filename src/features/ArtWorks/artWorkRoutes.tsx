import Layout from "../../components/ui/Layout";
import Artworks from "./pages/ArtWorks";
import Artwork from "./pages/ArtWork";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Edit from "./pages/Edit";

export const artWorkRoutes = [
  {
    path: "/artworks",
    element: <Artworks />,
  },
  {
    path: "/artworks/:id",
    element: <Artwork />,
  },
];

export const adminArtWorkRoutes = [
  {
    path: "artworks",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "artworks/new",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: "artworks/:id",
    element: (
      <Layout>
        <Edit />
      </Layout>
    ),
  },
];
