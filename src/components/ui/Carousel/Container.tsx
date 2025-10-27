import styles from "./Carousel.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect, PropsWithChildren } from "react";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  padding?: string;
  ariaLabelledBy?: string;
}


const Container = ({
  children,
  focusedIndex,
  setFocusedIndex,
  padding = "0 20px",
  ariaLabelledBy,
}: ContainerProps) => {
  const carousel = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [carousel.current?.scrollWidth, carousel.current?.offsetWidth, width]);

  return (
    <motion.div
      ref={carousel}
      className={styles.carousel}
      style={{ padding: padding }}
      role="region"
      aria-roledescription="carrossel"
      aria-labelledby={ariaLabelledBy}
      tabIndex={0}
      whileTap={{ cursor: "grabbing" }}
    >
      <motion.div
        className={styles.inner}
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
      >
        {React.Children.map(children, (child, index) =>
          child
            ? React.cloneElement(child as React.ReactElement, {
              isFocused: index === focusedIndex,
              setFocusedIndex,
            })
            : null
        )}
      </motion.div>
    </motion.div>
  );
};

interface ItemProps {
  image?: string;
  date?: string;
  dateEnds?: string;
  title?: string;
  link?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
  itemType?: string;
}

const Item = ({
  image,
  link,
  style,
  title,
  date,
  itemType = "item",
  children,
}: PropsWithChildren & ItemProps) => {
  // console.log('Rendering item with image:', image);

  const ariaLabel = `Acessar página da ${itemType} ${title || ""}${date ? `. Data: ${date}` : ""
    }`;

  return (

    <motion.div
      className={styles.item}
      style={{
        background: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(${image})`,
        backgroundSize: "cover",
        ...style,
      }}
    >
      <Link to={link ? link : ""} className={styles.a} aria-label={ariaLabel}>
        {children}
      </Link>
    </motion.div>
  );
};

const Title = ({ title }: { title: string }) => {
  return <h3 className={styles.h3}>{title}</h3>;
};

const Date = ({ date }: { date: string }) => {
  return (
    <p className={styles.p} style={{ paddingBottom: "var(--spacing-15)" }}>
      {date}
    </p>
  );
};

const Card = {
  Container,
  Item,
  Title,
  Date,
};

export default Card;
