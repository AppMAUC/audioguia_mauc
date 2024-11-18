import Button from "../../ui/Button";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Button>Fale Conosco</Button>
      <p>AppMauc &copy; 2024</p>
    </footer>
  );
};

export default Footer;
