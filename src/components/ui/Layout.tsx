// src/components/Layout.tsx
import Navbar from "../navigation/Navbar";
import { Outlet } from "react-router-dom";

import { useLocation } from "react-router-dom";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  if (location.pathname.includes("admin")) {
    return (
      <div id="layout-desktop">
        <div id="inner-desktop">
          <Navbar />
          <main
            style={{
              width: "100%",
              justifyContent: "center",
              display: "flex",
              minHeight: "100vh",
            }}
          >
            {children}
          </main>
          <footer style={{ width: "100%", height: "10vh" }}></footer>
        </div>
      </div>
    );
  }
  return (
    <div id="layout">
      <div id="inner">
        <Navbar />
        <main>
          <Outlet />
        </main>
        {!location.pathname.includes("about") && (
          <footer style={{ width: "100%", height: "10vh" }}></footer>
        )}
      </div>
    </div>
  );
};

export default Layout;
