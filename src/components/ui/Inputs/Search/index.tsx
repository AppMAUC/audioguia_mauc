import styles from "./Search.module.css";
import SearchIcon from "../../../../assets/icons/search.svg?react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Modal, Suggestions1, Suggestions2 } from "./Modal/Modal";

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
  const [isOpen, setIsOpen] = useState(true);

  const suggestionsList = [
    { label: "test1", image: "https://via.placeholder.com/150" },
    { label: "Antonio Bandeira", image: "https://via.placeholder.com/150" },
    { label: "Antonio Bandeira", image: "https://via.placeholder.com/150" },
    { label: "Antonio Bandeira", image: "https://via.placeholder.com/150" },
    { label: "Renato Cela", image: "https://via.placeholder.com/150" },
    { label: "Home" },
    { label: "Home" },
    { label: "Sobre" },
    { label: "Contato" },
    { label: "Acessibilidade" },
    { label: "Instalar" },
  ];
  return (
    <>
      <form
        className={`${styles.search_form}`}
        style={style}
        onSubmit={handleSearch}
      >
        <input
          onClick={() => setIsOpen((prev) => !prev)}
          ref={inputRef}
          className={`${styles.search_input}`}
          type="text"
          placeholder="Pesquisar"
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchIcon className={styles.search_icon} />
      </form>
      <Modal isOpen={isOpen} onClose={() => setIsOpen((prev) => !prev)}>
        <Suggestions1
          suggestionList={suggestionsList.filter((item) => item.image)}
        />
        <Suggestions2 suggestionList={suggestionsList} />
      </Modal>
    </>
  );
};

export default Search;
