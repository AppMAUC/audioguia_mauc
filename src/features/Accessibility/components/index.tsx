import styles from "./AccessibilityMenu.module.css";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { StateIcon } from "../../../assets";

export const Header = ({ children }: PropsWithChildren) => {
  return (
    <header className={styles.header}>
      <h3 className={styles.h3} aria-label="Menu Acessibilidade">
        Menu Acessibilidade
      </h3>
      {children}
    </header>
  );
};

export const Footer = ({ children }: PropsWithChildren) => {
  return (
    <footer className={styles.footer}>
      {children}
      <p aria-label="Menu Acessibilidade">
        Redefinir todas as configurações de acessibilidade.
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
  const arrayOfStateNumber = [0, 1, 2, 3];
  return (
    <div className={styles.states} aria-label={`Tamanho ${state}`}>
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
