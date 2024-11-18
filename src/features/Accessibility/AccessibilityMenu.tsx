// AccessibilityMenu.tsx
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

interface MenuProps {
  isOpen: boolean;
  setModalOpen: () => void;
}

const AccessibilityMenu = ({ isOpen, setModalOpen }: MenuProps) => {
  const { fontSize, spacing, changeFontSize, changeSpacing, reset } =
    useAccessibility();
  const { toggleTheme, theme } = useTheme();
  const handleReset = () => {
    // resetar tamanho da fonte e espaçamento
    toggleTheme("default");
    reset();
  };

  return (
    <>
      <div
        onClick={setModalOpen}
        className={
          isOpen ? styles.container : `${styles.container} ${styles.hide}`
        }
      ></div>
      <div
        className={isOpen ? `${styles.body}` : `${styles.body} ${styles.hide}`}
      >
        <Header>
          <button
            onClick={setModalOpen}
            aria-label="Fechar Menu de Acessibilidade"
          >
            <CloseIcon className={styles.close} />
          </button>
        </Header>
        <section className={styles.section}>
          <Button
            onClick={() => {
              toggleTheme("dark");
            }}
            className={theme == "dark" ? `${styles.active}` : ""}
          >
            <ContrastIcon className={styles.icons} />
            <Button.Title>Contraste escuro</Button.Title>
          </Button>
          <Button
            onClick={() => toggleTheme("light")}
            className={theme == "light" ? `${styles.active}` : ""}
          >
            <ContrastIcon className={styles.contrast_icon} />
            <Button.Title>Contraste claro</Button.Title>
          </Button>
        </section>
        <section className={styles.section}>
          <Button
            onClick={changeFontSize}
            className={fontSize > 0 ? `${styles.active}` : ""}
          >
            <TypeIcon className={styles.icons} />
            <Button.Title>Tamanho</Button.Title>
            <Button.State state={fontSize} />
          </Button>
          <Button
            onClick={changeSpacing}
            className={spacing > 0 ? `${styles.active}` : ""}
          >
            <SpacingIcon className={styles.icons} />
            <Button.Title>Espaçamento</Button.Title>
            <Button.State state={spacing} />
          </Button>
        </section>
        <Footer>
          <button onClick={handleReset} aria-label="Restaurar configurações">
            <RefreshIcon />
          </button>
        </Footer>
      </div>
    </>
  );
};

export default AccessibilityMenu;
