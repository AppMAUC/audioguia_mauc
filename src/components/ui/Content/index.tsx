import styles from "./Content.module.css";
import React from "react";

interface IContent {
  children: React.ReactNode;
}

interface IImage {
  src: string;
  alt: string;
}

interface IDesc {
  children: React.ReactNode;
  color: string;
}

const Content = ({ children }: IContent) => {
  return <section className={styles.content}>{children}</section>;
};

const Title = ({ children, id }: IContent & { id?: string }) => {
  return <h1 className={styles.title} id={id}>{children}</h1>;
};

const Image = ({ src, alt }: IImage) => {
  return <img className={styles.image} src={src} alt={alt} />;
};

const Desc = ({ children, color }: IDesc) => {
  return <p className={`${styles.desc} ${styles[color]}`}>{children}</p>;
};

const ImageWrapper = ({ children }: IContent) => {
  return <div className={styles.imageWrapper}>{children}</div>;
};

Content.Title = Title;
Content.Desc = Desc;
Content.Image = Image;
Content.ImageWrapper = ImageWrapper;

export default Content;
