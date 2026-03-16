import { useAccessibility } from "./useAccessibility";
import { useTheme } from "../Theme/ThemeProvider";
import styles from "./components/AccessibilityMenu.module.css";
import { Footer, Header, Button } from "./components";
import {
  CloseIcon,
  ContrastIcon,
  RefreshIcon,
  SpacingIcon,
  TypeIcon,
} from "../../assets";
import { useTranslation } from "../Language/useTranslation";

interface MenuProps {
  isOpen: boolean;
  tabIndex: number;
  setModalOpen: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

const AccessibilityMenu = ({
  isOpen,
  setModalOpen,
  tabIndex,
  onKeyDown,
}: MenuProps) => {
  const { t } = useTranslation();
  const { fontSize, spacing, changeFontSize, changeSpacing, reset } =
    useAccessibility();
  const { toggleTheme, theme } = useTheme();

  const handleReset = () => {
    toggleTheme("default");
    reset();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        onClick={setModalOpen}
        onKeyDown={onKeyDown}
        className={styles.container}
      />

      <div className={styles.body} tabIndex={tabIndex}>
        <Header>
          <button
            onClick={setModalOpen}
            aria-label={t('accessibility.closeButtonAriaLabel')}
          >
            <CloseIcon className={styles.close} />
          </button>
        </Header>

        <section className={styles.section}>
          <Button
            onClick={() => {
              toggleTheme("dark");
            }}
            className={theme === "dark" ? styles.active : ""}
          >
            <ContrastIcon className={styles.icons} />
            <Button.Title>{t('accessibility.darkContrast')}</Button.Title>
          </Button>

          <Button
            onClick={() => toggleTheme("light")}
            className={theme === "light" || theme === "default" ? styles.active : ""}
          >
            <ContrastIcon className={styles.contrast_icon} />
            <Button.Title>{t('accessibility.lightContrast')}</Button.Title>
          </Button>
        </section>

        <section className={styles.section}>
          <Button
            onClick={changeFontSize}
            className={fontSize > 0 ? styles.active : ""}
          >
            <TypeIcon className={styles.icons} />
            <Button.Title>{t('accessibility.size')}</Button.Title>
            <Button.State state={fontSize} />
          </Button>

          <Button
            onClick={changeSpacing}
            className={spacing > 0 ? styles.active : ""}
          >
            <SpacingIcon className={styles.icons} />
            <Button.Title>{t('accessibility.spacing')}</Button.Title>
            <Button.State state={spacing} />
          </Button>
        </section>

        <Footer>
          <button
            onClick={handleReset}
            aria-label={t('accessibility.resetButtonAriaLabel')}
          >
            <RefreshIcon />
          </button>
        </Footer>
      </div>
    </>
  );
};

export default AccessibilityMenu;