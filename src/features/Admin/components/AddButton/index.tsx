import { useNavigate } from "react-router-dom";
import { AddIcon } from "../../../../assets";
import styles from "./AddButton.module.css";

const AddButton = ({ link }: { link: string }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(link)}
      className={styles.add_button}
      title="Add"
    >
      <AddIcon className={styles.add_icon} />
    </button>
  );
};

export default AddButton;
