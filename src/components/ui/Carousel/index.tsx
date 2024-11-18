import Container from "./Container";

interface Image {
  id: string;
  image: string;
  author: string;
  dateEnds: string;
  title: string;
}

interface CarouselProps {
  images: Image[];
}

const Carousel = ({ images }: CarouselProps) => {
  return (
    <Container
      focusedIndex={0}
      setFocusedIndex={function (): void {
        throw new Error("Function not implemented.");
      }}
    >
      {images.slice(0, 3).map((image) => (
        <Container.Item
          key={image.id}
          image={image.image}
          author={image.author}
          dateEnds={image.dateEnds}
          title={image.title}
          link={image.id}
        />
      ))}
    </Container>
  );
};

export default Carousel;
