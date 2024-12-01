import { useNavigate } from "react-router-dom";
import { CalendarIcon } from "../../../assets";
import styles from "./Item.module.css";
import { PropsWithChildren } from "react";

const BigContent = ({ children }: PropsWithChildren) => {
  return <div className={`${styles.content} ${styles.big}`}>{children}</div>;
};

interface FlexProps {
  width?: string;
  height?: string;
  justify?:
    | "flex-start"
    | "center"
    | "start"
    | "end"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?:
    | "stretch"
    | "center"
    | "flex-end"
    | "flex-start"
    | "baseline"
    | "space-between"
    | "space-around";
  gap?: string;
  margin?: string;
  marginTop?: string;
  padding?: string;
  paddingLeft?: string;
}

const Container = ({
  children,
  ...props
}: PropsWithChildren<FlexProps> & React.CSSProperties) => {
  return (
    <div className={styles.container} style={{ ...props }}>
      {children}
    </div>
  );
};

const Row = ({
  children,
  justify = "flex-start",
  align = "stretch",
  gap,
  margin,
  marginTop,
  padding,
  width,
  height,
}: PropsWithChildren<FlexProps>) => {
  return (
    <div
      className={styles.row}
      style={{
        justifyContent: justify,
        alignItems: align,
        gap,
        marginTop: marginTop,
        marginBottom: margin,
        padding,
        width,
        height,
      }}
    >
      {children}
    </div>
  );
};

const Column = ({
  children,
  justify = "flex-start",
  align = "stretch",
  gap,
  margin,
  padding,
  paddingLeft,
  width,
  height,
}: PropsWithChildren<FlexProps>) => {
  return (
    <div
      className={styles.column}
      style={{
        justifyContent: justify,
        alignItems: align,
        gap,
        marginBottom: margin,
        paddingLeft: paddingLeft,
        padding,
        width,
        height,
      }}
    >
      {children}
    </div>
  );
};

const ShortContent = ({ children }: PropsWithChildren) => {
  return <div className={`${styles.content} ${styles.small}`}>{children}</div>;
};

const Title = ({ children }: PropsWithChildren) => {
  return <h2 className={styles.title}>{children}</h2>;
};
const Subtitle = ({ children }: PropsWithChildren) => {
  return <h3 className={styles.subtitle}>{children}</h3>;
};

const Description = ({ children }: PropsWithChildren) => {
  return <p className={styles.description}>{children}</p>;
};

const Info = ({ name, value }: { name: string; value: string }) => {
  return (
    <div className={styles.info}>
      <span className={styles.info_name}>{name}: </span>
      <span className={styles.info_value}>{value}</span>
    </div>
  );
};

const Button = ({
  children,
  id,
  module,
  ...props
}: PropsWithChildren & { id?: string; module: string }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/${module}/${id}`);
  };

  return (
    <button onClick={handleClick} className={styles.button} {...props}>
      {children}
    </button>
  );
};

const OneDate = ({
  initial = "Desde",
  date,
}: {
  date: string;
  initial?: string;
}) => {
  return (
    <div className={styles.date}>
      <CalendarIcon className={styles.calendar} />
      <span className={styles.date_span}>
        {initial} {date}
      </span>
    </div>
  );
};
const TwoDate = ({
  initial = "De",
  children,
  start,
  end,
}: PropsWithChildren & { start: string; end: string; initial?: string }) => {
  return (
    <div className={styles.date}>
      <CalendarIcon className={styles.calendar} />
      <span className={styles.date_span}>
        {initial} {start} {children} {end}
      </span>
    </div>
  );
};

const Image = ({
  src,
  alt,
  tam,
}: {
  src: string;
  alt: string;
  tam: boolean;
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`${styles.image} ${tam ? styles.big : styles.small}`}
    />
  );
};

const Item = {
  Container,
  BigContent,
  ShortContent,
  Title,
  Subtitle,
  Description,
  Info,
  Button,
  OneDate,
  TwoDate,
  Image,
  Row,
  Column,
};

export default Item;
