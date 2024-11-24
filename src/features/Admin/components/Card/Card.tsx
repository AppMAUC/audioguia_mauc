import { Link, useNavigate } from "react-router-dom";
import styles from "./Card.module.css";
import { PropsWithChildren } from "react";
import { AddIcon, EditIcon } from "../../../../assets";

interface CardProps extends PropsWithChildren {
  link?: string;
}

export const Card = ({ children, link }: CardProps) => {
  return (
    <div className={styles.card}>
      <Link to={link || "/admin/dashboard"} className={styles.card_link}>
        {children}
      </Link>
    </div>
  );
};

const CardButton = ({
  children,
  link,
}: PropsWithChildren & { link: string }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <button onClick={handleClick} className={styles.card_button}>
      {children}
    </button>
  );
};

const Container = ({ children }: PropsWithChildren) => {
  return <div className={`${styles.card} ${styles.relative}`}>{children}</div>;
};

export const CardList = ({ children }: PropsWithChildren) => {
  return <div className={styles.card_list}>{children}</div>;
};

const Info = ({ children }: PropsWithChildren) => {
  return <div className={styles.info}>{children}</div>;
};

const Title = ({ children }: PropsWithChildren) => {
  return <h2 className={styles.title}>{children}</h2>;
};

const Subtitle1 = ({ children }: PropsWithChildren) => {
  return <h3 className={styles.subtitle1}>{children}</h3>;
};
const Subtitle2 = ({ children }: PropsWithChildren) => {
  return <h3 className={styles.subtitle2}>{children}</h3>;
};

const Image = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className={styles.image_container}>
      <img className={styles.image} src={src} alt={alt} />
    </div>
  );
};

const Edit = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.edit}>
      <EditIcon className={styles.edit_icon} />
      {children}
    </div>
  );
};

const Add = ({ link }: { link: string }) => {
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

Card.Title = Title;
Card.Subtitle1 = Subtitle1;
Card.Subtitle2 = Subtitle2;
Card.Image = Image;
Card.Info = Info;
Card.Edit = Edit;
Card.Add = Add;
Card.Button = CardButton;
Card.Div = Container;
