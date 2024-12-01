import styles from "./Search.module.css";
import SearchIcon from "../../../../assets/icons/search.svg?react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

interface SearchProps {
  style?: object;
}

const Search = ({ style }: SearchProps) => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <>
      <form
        className={`${styles.search_form}`}
        style={style}
        onSubmit={handleSearch}
      >
        <input
          ref={inputRef}
          className={`${styles.search_input}`}
          type="text"
          placeholder="Pesquisar"
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchIcon className={styles.search_icon} />
      </form>
    </>
  );
};

export default Search;
