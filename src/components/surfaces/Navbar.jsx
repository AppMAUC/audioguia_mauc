// CSS
import "./Navbar.css"
import { BsSearch, BsFillPersonFill } from 'react-icons/bs';

// Components
import { NavLink, Link } from "react-router-dom"

// Hooks
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../../slices/authSlice";


const Navbar = () => {
    const { auth, loading } = useAuth();
    const { admin } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [query, setQuery] = useState();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());

        navigate("/");
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (query) {
            return navigate(`/search?q=${query}`)
        }
    }


    return (
        <nav id="nav">
            <Link to="/">AppMauc</Link>
            {!admin &&
                <form id="search-form" onSubmit={handleSearch}>
                    <BsSearch />
                    <input type="text" placeholder="Pesquisar" onChange={(e) => setQuery(e.target.value)} />
                </form>
            }
            <ul id="nav-links">
                {auth  && (
                    <>
                        {/* <li>
                            <NavLink to="/">
                                <BsHouseDoorFill />
                            </NavLink>
                        </li>
                        {admin &&
                            <li>
                                <NavLink to={`/admin/${admin._id}`}>
                                    <BsFillCameraFill />
                                </NavLink>
                            </li>
                        } */}
                        <li>
                            <NavLink to={"/admin/profile"}>
                                <BsFillPersonFill />
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink to="/admin/register">
                                Cadastrar um novo Adm
                            </NavLink>
                        </li> */}
                        <li>
                            <span onClick={handleLogout}>Sair</span>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar