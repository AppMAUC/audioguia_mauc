import Card from "./Container";

interface CarouselProps {
  items: any[];
  link?: string;
  style?: React.CSSProperties;
  num: number;
}

const Carousel = ({ items, link, style, num = 3 }: CarouselProps) => {
  console.log('Carousel items:', items);
  return (
    <Card.Container
      focusedIndex={0}
      setFocusedIndex={function (): void {
        throw new Error("Function not implemented.");
      }}
    >
      {items.slice(0, num).map((item: any) => (
        <Card.Item
          key={item.image?.url}
          image={encodeURI(item.image?.url)}
          link={`/${link}/${item._id}`}
          style={style}
        >
          <Card.Title title={item.title} />
          <p style={{ paddingBottom: "15px" }} />
          {/* <Card.Date date={new Date(item.dateEnds).toLocaleDateString('pt-BR')} /> */}
        </Card.Item>
      ))}
    </Card.Container>
  );
};

export default Carousel;
