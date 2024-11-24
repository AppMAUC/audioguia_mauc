import { PropsWithChildren } from "react";
import { ArrowBack } from "../../../assets";
import styles from "./Back.module.css";
import { NavLink } from "react-router-dom";

const Back = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.back}>
      <NavLink to="/admin/dashboard">
        <ArrowBack className={styles.icon} />
      </NavLink>
      <h1 className={styles.title}>{children}</h1>
    </div>
  );
};

export default Back;
