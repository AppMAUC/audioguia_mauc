import Layout from "../../components/ui/Layout";

export const artWorkRoutes = [
  {
    path: "/artworks",
    element: <h1>Artworks</h1>,
  },
  {
    path: "/artworks/:id",
    element: <h1>:id</h1>,
  },
];

export const adminArtWorkRoutes = [
  {
    path: "artworks",
    element: (
      <Layout>
        <h1>Artworks</h1>
      </Layout>
    ),
  },
  {
    path: "artworks/new",
    element: (
      <Layout>
        <h1>new</h1>
      </Layout>
    ),
  },
  {
    path: "artworks/:id",
    element: (
      <Layout>
        <h1>:id</h1>
      </Layout>
    ),
  },
];
