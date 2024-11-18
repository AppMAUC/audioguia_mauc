// CSS
import styles from "./Navbar.module.css";

import { MenuIcon, MaucHomeIcon, AccessbilityIcon } from "../../../assets";

// Components
import { Link } from "react-router-dom";
import Menu from "../Menu";
import Search from "../../ui/Inputs/Search";
import Install from "../../Install/Install";
// Hooks
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/Admin/hooks/useAuth";
import AccessibilityMenu from "../../../features/Accessibility/AccessibilityMenu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openAccessibility, setAccessibility] = useState(false);
  const { auth } = useAuth();

  //const navigate = useNavigate();

  // const handleLogout = async () => {
  //   await logout();
  //   navigate("/");
  // };

  return (
    <>
      <div
        style={{
          boxSizing: "border-box",
          gap: "1em",
          marginTop: "var(--spacing)",
          width: "100%",
          height: "60px",
          backgroundColor: "var(--color-bg)",
          zIndex: "999",
        }}
      ></div>
      <nav
        className={styles.nav}
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          borderRadius: "0px 0px 10px 10px",
        }}
      >
        <div className={styles.nav_itens}>
          <Link to="/" className={styles.item_link}>
            <MaucHomeIcon className="svg1" />
          </Link>

          <button
            onClick={() => setAccessibility(!openAccessibility)}
            className={`${styles.menu_button} ${styles.acces_icon}`}
            aria-label="Menu Acessibilidade"
          >
            <AccessbilityIcon width={40} height={40} />
          </button>
          <AccessibilityMenu
            isOpen={openAccessibility}
            setModalOpen={() => setAccessibility(!openAccessibility)}
          />
          <Install />
          <button onClick={() => setOpen(!open)} className={styles.menu_button}>
            <MenuIcon className="svg2" width={40} height={40} />
          </button>
          <Menu isOpen={open} setModalOpen={() => setOpen(!open)} />
        </div>
      </nav>
      {!auth && (
        <div className={`${styles.search} ${styles.nav_itens}`}>
          <Search />
        </div>
      )}
    </>
  );
};

export default Navbar;
