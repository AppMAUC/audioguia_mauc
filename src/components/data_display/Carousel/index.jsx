import styles from "./Carousel.module.css";
import back from "../../../assets/Icons/arrow_back.svg";
import foward from "../../../assets/Icons/arrow_forward.svg";
import dot from "../../../assets/Icons/Ellipse 8.svg";
import dot_active from "../../../assets/Icons/Ellipse 6.svg";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import React from "react";


const Carousel = ({ children, focusedIndex, setFocusedIndex }) => {
  const carousel = useRef();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
  }, []);

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
          React.cloneElement(child, {
            isFocused: index === focusedIndex,
            setFocusedIndex,
          })
        )}
      </motion.div>
    </motion.div>
  );
};

const Item = ({ image, author, dateEnds, title, link }) => {
  return (
    <motion.div
      className={`${styles.item}`}
      style={{
        background: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(${image})`,
        backgroundSize: "cover",
      }}
    >
      <NavLink to={`/artworks/${link}`} className={styles.none}>
        <h3 className={styles.text}>{title}</h3>
        <p className={styles.text}>{author}</p>
        <p className={styles.text} style={{  marginBottom: '.4em'}}>Até {dateEnds}</p>
      </NavLink>
    </motion.div>
  );
};

const Controls = ({ focusedIndex, next, prev, tam }) => {
  return (
    <div className={styles.controls}>
      <button
        className={styles.control_btn}
        onClick={() => prev()}
        disabled={focusedIndex === 0}
      >
        <img src={back} alt="Previous" />
      </button>
      <div className={styles.dots}>
        {tam.map((_, index) => (
          <img
            key={index}
            src={focusedIndex === index ? dot_active : dot}
            alt="Dot"
          />
        ))}
      </div>
      <button
        className={styles.control_btn}
        onClick={() => next()}
        disabled={focusedIndex === 2}
      >
        <img src={foward} alt="Next" />
      </button>
    </div>
  );
};

Carousel.Controls = Controls;
Carousel.Item = Item;

export default Carousel;
