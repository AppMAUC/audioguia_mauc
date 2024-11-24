import styles from "./Carousel.module.css";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
}

const Container = ({
  children,
  focusedIndex,
  setFocusedIndex,
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
  image: string;
  author: string;
  dateEnds: string;
  title: string;
  link: string;
}

const Item = ({ image, dateEnds, title, link }: ItemProps) => {
  return (
    <motion.div
      className={`${styles.item}`}
      style={{
        background: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(${image})`,
        backgroundSize: "cover",
      }}
    >
      <NavLink to={`/artworks/${link}`} className={styles.none}>
        <h3 className={styles.h3}>{title}</h3>
        <h3
          className={styles.h3}
          style={{ paddingBottom: "var(--spacing-15)" }}
        >
          {dateEnds}
        </h3>
      </NavLink>
    </motion.div>
  );
};

Container.Item = Item;

export default Container;
