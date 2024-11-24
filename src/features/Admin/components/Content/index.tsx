import styles from "./Content.module.css";
import { PropsWithChildren } from "react";

const Content = ({ children }: PropsWithChildren) => {
  return <div className={styles.content}>{children}</div>;
};

const Title = ({ children }: PropsWithChildren) => {
  return <div className={styles.title}>{children}</div>;
};

Content.Title = Title;

export default Content;
