import Home from "./pages/Home/Home.tsx";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "../../pages/NotFound/NotFoundPage";
import Profile from "./pages/Profile/Profile.tsx";

export const adminRoutes = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
  },
];
