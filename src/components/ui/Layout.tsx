// src/components/Layout.tsx
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const currentUrl = window.location.href;

  if (currentUrl.includes("admin")) {
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
          <footer style={{width: "100%", height: "10vh"}}>
          </footer>
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
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
