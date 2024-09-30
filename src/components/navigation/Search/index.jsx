import styles from "./Search.module.css";
import search from "../../../assets/Icons/search.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <form className={styles.search_form} onSubmit={handleSearch}>
      <input
        className={`${styles.search_input}`}
        type="text"
        placeholder="Pesquisar"
        onChange={(e) => setQuery(e.target.value)}
      />
      <img src={search} alt="Pesquisar" width={24} height={24} />
    </form>
  );
};

export default Search;
