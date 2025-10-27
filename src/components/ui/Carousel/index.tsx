import Card from "./Container";

interface CarouselProps {
  items: any[];
  link?: string;
  style?: React.CSSProperties;
  num: number;
  ariaLabelledBy?: string;
  itemType?: string;
}

const Carousel = ({ items, link, style, num = 3, ariaLabelledBy, itemType = "item", }: CarouselProps) => {
  // console.log('Carousel items:', items);

  return (

    <Card.Container
      focusedIndex={0}
      setFocusedIndex={() => { }}
      ariaLabelledBy={ariaLabelledBy}
    >
      {items.slice(0, num).map((item: any) => (
        <Card.Item
          key={item._id || item.image?.url}
          image={encodeURI(item.image?.url)}
          link={`/${link}/${item._id}`}
          style={style}
          title={item.title}
          date={item.date}
          itemType={itemType}
        >
          <Card.Title title={item.title} />
          <p style={{ paddingBottom: "15px" }} />
        </Card.Item>
      ))}
    </Card.Container>
  );
};

export default Carousel;
