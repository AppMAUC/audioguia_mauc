import Carousel from "../../components/data_display/Carousel";
import styles from "./Home.module.css";
import { useState } from "react";

const CarouselWithControls = ({ images }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const next = () => {
    setFocusedIndex((prev) => prev + 1);
  };

  const prev = () => {
    setFocusedIndex((prev) => prev - 1);
  };

  return (
    <>
      <Carousel focusedIndex={focusedIndex} setFocusedIndex={setFocusedIndex}>
        {images.slice(0, 3).map((image, index) => (
            <Carousel.Item
              key={image.id}
              image={image.image}
              author={image.author}
              dateEnds={image.dateEnds}
              title={image.title}
              index={index}
              link={image.id}
              onClick={setFocusedIndex}
            />
        ))}
      </Carousel>
      <div className={styles.center}>
        <Carousel.Controls
          focusedIndex={focusedIndex}
          next={next}
          prev={prev}
          tam={images.slice(0, 3)}
        />
      </div>
    </>
  );
};

export default CarouselWithControls;
