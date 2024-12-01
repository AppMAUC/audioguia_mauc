import { CloseIcon, SearchIcon } from "../../../../../assets";
import styles from "./Modal.module.css";
import { PropsWithChildren } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) => {
  return (
    <div
      className={`${styles.modal} ${isOpen ? styles.modal_open : ""}`}
      onClick={onClose}
    >
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

interface Suggestion {
  image?: string;
  label: string;
  removeItem?: (label: string) => void;
}

type SuggestionList = Array<Suggestion>;

interface SuggestionsProps {
  suggestionList: SuggestionList;
  removeItem?: (label: string) => void;
}
export const Suggestions1 = ({
  suggestionList,
  removeItem,
}: SuggestionsProps) => {
  return (
    <div className={styles.suggestion}>
      {suggestionList.map((suggestion, index) => (
        <SuggestionItem1
          key={index}
          label={suggestion.label}
          image={suggestion.image}
          removeItem={removeItem}
        />
      ))}
    </div>
  );
};
export const Suggestions2 = ({
  suggestionList,
  removeItem,
}: SuggestionsProps) => {
  return (
    <div className={styles.suggestion2}>
      {suggestionList.map((suggestion, index) => (
        <SuggestionItem2
          key={index}
          label={suggestion.label}
          removeItem={removeItem}
        />
      ))}
    </div>
  );
};

const SuggestionItem1 = ({ image, label }: Suggestion) => {
  return (
    <div className={styles.suggestion_item1}>
      <img src={image} alt={label} />
      <span>{label}</span>
    </div>
  );
};

const SuggestionItem2 = ({ label, removeItem }: Suggestion) => {
  return (
    <div className={styles.suggestion_item2}>
      <SearchIcon className={styles.search} />
      <div className={styles.inner}>
        <span className={styles.label}>{label}</span>
        <button
          title={"Fechar"}
          onClick={() => removeItem && removeItem(label)}
        >
          <CloseIcon className={styles.close} />
        </button>
      </div>
    </div>
  );
};
