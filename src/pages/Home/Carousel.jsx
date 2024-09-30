import Carousel from "../../components/data_display/Carousel";
import { useState } from "react";

const CarouselC = ({ images }) => {
  return (
    <Carousel>
      {images.slice(0, 3).map((image, index) => (
        <Carousel.Item
          key={image.id}
          image={image.image}
          author={image.author}
          dateEnds={image.dateEnds}
          title={image.title}
          link={image.id}
        />
      ))}
    </Carousel>
  );
};

export default CarouselC;
