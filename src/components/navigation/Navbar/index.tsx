// CSS
import styles from "./Navbar.module.css";

import {
  MenuIcon,
  MaucHomeIcon,
  AccessbilityIcon,
  AccountIcon,
} from "../../../assets";

// Components
import { Link } from "react-router-dom";
import Menu from "../Menu";
import Search from "../../ui/Inputs/Search";
import Install from "../../Install/Install";
// Hooks
import { useState } from "react";
import { useAuth } from "../../../features/Admin/hooks/useAuth";
import AccessibilityMenu from "../../../features/Accessibility/AccessibilityMenu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openAccessibility, setAccessibility] = useState(false);
  const { auth, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <div className={styles.nav_clone}></div>
      <nav className={styles.nav}>
        <div className={styles.nav_itens}>
          <Link
            tabIndex={1}
            to={auth ? "/admin/dashboard" : "/"}
            className={styles.item_link}
          >
            <MaucHomeIcon className="svg1" />
          </Link>

          <button
            onClick={() => setAccessibility(!openAccessibility)}
            className={`${styles.menu_button} ${styles.acces_icon}`}
            aria-label="Menu Acessibilidade"
            tabIndex={1}
          >
            <AccessbilityIcon width={40} height={40} />
          </button>

          <AccessibilityMenu
            tabIndex={-1}
            isOpen={openAccessibility}
            setModalOpen={() => setAccessibility(!openAccessibility)}
          />

          <Install />
          <div className={styles.divider}>
            {auth && (
              <>
                <div className={`${styles.nav_search_desk}`}>
                  <Search />
                </div>
                <button
                  tabIndex={1}
                  className={styles.menu_button}
                  onClick={handleLogout}
                  title="Sair"
                >
                  <AccountIcon className="svg2" width={40} height={40} />
                </button>
              </>
            )}
            <button
              tabIndex={1}
              onClick={() => setOpen(!open)}
              className={styles.menu_button}
              title="Menu"
            >
              <MenuIcon className="svg2" width={40} height={40} />
            </button>
            <Menu
              tabIndex={-1}
              isOpen={open}
              setModalOpen={() => setOpen(!open)}
            />
          </div>
        </div>
      </nav>
      <div className={`${styles.search} `}>
        <Search />
      </div>
    </>
  );
};

export default Navbar;
