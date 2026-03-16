import styles from "./AccessibilityMenu.module.css";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { StateIcon } from "../../../assets";
import { useTranslation } from "../../Language/useTranslation";

export const Header = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <h3 className={styles.h3} aria-label={t('accessibility.menuAriaLabel')}>
        {t('accessibility.menuTitle')}
      </h3>
      {children}
    </header>
  );
};

export const Footer = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      {children}
      <p aria-label={t('accessibility.menuAriaLabel')}>
        {t('accessibility.resetDescription')}
      </p>
    </footer>
  );
};

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export const Button = ({
  children,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Title = ({ children }: PropsWithChildren) => {
  return <p className={styles.title}>{children}</p>;
};

interface StateProps {
  state: number;
}

const State = ({ state }: StateProps) => {
  const { t } = useTranslation();
  const arrayOfStateNumber = [0, 1, 2, 3];

  return (
    <div className={styles.states} aria-label={t('accessibility.stateAriaLabel', { value: state })}>
      {arrayOfStateNumber.slice(1).map((item) => (
        <StateIcon
          key={item}
          className={` ${styles.state} ${item <= state ? styles.active : ""}`}
        />
      ))}
    </div>
  );
};

Button.Title = Title;
Button.State = State;