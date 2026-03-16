import { PPCALogo, ProcultLogo } from "../../../assets";
import styles from "./Footer.module.css";
import { useTranslation } from "../../../features/Language/useTranslation";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <button
        className={styles.button}
        aria-label={t('footer.contactButtonAriaLabel')}
      >
        {t('footer.contactButton')}
      </button>
      <div className={styles.logos}>
        <PPCALogo width={100} height={100} />
        <ProcultLogo width={100} height={100} />
      </div>
    </footer>
  );
};

export default Footer;