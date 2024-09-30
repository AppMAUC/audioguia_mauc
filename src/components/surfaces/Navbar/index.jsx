// CSS
import styles from "./Navbar.module.css";
import { BsSearch, BsFillPersonFill } from "react-icons/bs";
import mauc from "../../../assets/Icons/mauc_logo_reduzida.svg";
import menu from "../../../assets/Icons/menu.svg";

// Components
import { NavLink, Link } from "react-router-dom";
import MenuHamburguer from "./MenuHamburguer";
// Hooks
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../../../slices/authSlice";
import Search from "../../navigation/Search";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { auth, loading } = useAuth();
  const { admin } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/");
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.nav_itens}>
          <Link to="/" className={styles.item_link}>
            <img src={mauc} alt="Mauc Logo" />
          </Link>
          <button onClick={() => setOpen(!open)}>
            <img src={menu} alt="Menu Hambúrguer" width={40} height={40} />
          </button>
        <MenuHamburguer isOpen={open} setModalOpen={() => setOpen(!open)} />
        </div>
        {!admin && (
          <div className={styles.nav_itens}>
            <Search />
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
