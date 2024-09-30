import styles from "./Content.module.css";

const Content = ({ children }) => {
  return <section className={styles.content}>{children}</section>;
};

const Title = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};

const Image = ({ src, alt }) => {
  return <img className={styles.image} src={src} alt={alt} />;
};

const Desc = ({ children, color }) => {
  return <p className={`${styles.desc} ${styles[color]}`}>{children}</p>;
};

Content.Title = Title;
Content.Desc = Desc;
Content.Image = Image;

export default Content;
