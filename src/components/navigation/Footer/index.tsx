import { PPCALogo, ProcultLogo } from "../../../assets";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <button className={styles.button}>Fale Conosco</button>
      <div className={styles.logos}>
        <PPCALogo width={100} height={100}/>
        <ProcultLogo width={100}  height={100}/>
      </div>
    </footer>
  );
};

export default Footer;
