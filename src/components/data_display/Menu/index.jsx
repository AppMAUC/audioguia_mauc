import styles from "./Menu.module.css";
import down from "../../../assets/Icons/arrow_downward.svg";
import up from "../../../assets/Icons/arrow_upward.svg";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Menu = ({ children}) => {
  return <div>{children}</div>;
};

const Nav = ({ children }) => {
  return <div className={styles.nav}>{children}</div>;
};

const Footer = ({ children }) => {
  return <div className={styles.footer}>{children}</div>;
};

const Items = ({ children }) => {
  return <div className={styles.items}>{children}</div>;
};

const Item = ({ children, link, onClick }) => {
  return <Link to={link} onClick={onClick} className={styles.item}>{children}</Link>;
};

const Suspense = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={styles.suspense}>
        {children[0]}
        <button className={styles.suspense_btn} onClick={() => setOpen(!open)}>
          <img src={open ? up : down} width={20} alt="seta" />
        </button>
      </div>
      <div className={open ? `${styles.suspense_items}` : `${styles.suspense_items} ${styles.hide}`}>
        {children[1]}
      </div>
    </>
  );
};

const Icon = ({ src, alt, ...props }) => {
  return <img src={src} alt={alt} {...props} />;
};

const Text = ({ children }) => {
  return <p className={styles.p}>{children}</p>;
};

Menu.Item = Item;
Menu.Suspense = Suspense;
Menu.Icon = Icon;
Menu.Text = Text;
Menu.Items = Items;
Menu.Nav = Nav;
Menu.Footer = Footer;

export default Menu;
