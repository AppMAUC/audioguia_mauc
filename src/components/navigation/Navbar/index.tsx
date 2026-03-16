import styles from "./Navbar.module.css";

import { MenuIcon, MaucHomeIcon, AccessbilityIcon } from "../../../assets";


import { Link } from "react-router-dom";
import Menu from "../Menu";
import Search from "../../ui/Inputs/Search";
import Install from "../../Install/Install";

import { useEffect, useState } from "react";
import { useAuth } from "../../../features/Admin/hooks/useAuth";
import AccessibilityMenu from "../../../features/Accessibility/AccessibilityMenu";
import AccountPopover from "../Popover";
import { useTranslation } from "../../../features/Language/useTranslation";

const Navbar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openAccessibility, setAccessibility] = useState(false);
  const { auth } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        setOpen(false);
        setAccessibility(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* <div id="navbarclone" className={styles.nav_clone}></div> */}
      <nav id="navbar" className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.nav_itens}>

          <Link
            tabIndex={1}
            to={auth ? "/admin/dashboard" : "/"}
            className={styles.item_link}
            aria-label={t('navbar.homeLinkAriaLabel')}
          >
            <MaucHomeIcon className="svg1" />
          </Link>

          <button
            onClick={() => setAccessibility(!openAccessibility)}
            className={`${styles.menu_button} ${styles.acces_icon}`}
            aria-label={t('navbar.accessibilityButtonAriaLabel')}
            aria-expanded={openAccessibility}
            aria-controls="accessibility-menu"
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
                  <AccountPopover />
                </div>
              </>
            )}

            <button
              tabIndex={1}
              onClick={() => setOpen(!open)}
              className={styles.menu_button}
              aria-label={t('navbar.menuButtonAriaLabel')}
              aria-expanded={open}
              aria-controls="main-menu"
              title={t('navbar.menuButtonTitle')}
            >
              <MenuIcon className="svg2" width={40} height={40} />
            </button>
            <Menu
              id="main-menu"
              tabIndex={-1}
              isOpen={open}
              setModalOpen={() => setOpen(!open)}
            />
          </div>
        </div>
      </nav>

      <div id="searchbar" className={`${styles.search} `}>
        <Search />
      </div>
    </>
  );
};

export default Navbar;