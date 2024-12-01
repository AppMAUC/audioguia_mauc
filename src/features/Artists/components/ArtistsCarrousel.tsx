import Card from "../../../components/ui/Carousel/Container";
import Item from "../../../components/ui/Item";
import { ArtWork } from "../../ArtWorks/types/ArtWork";

interface CarouselProps {
  items: ArtWork[];
  link?: string;
  style?: React.CSSProperties;
}

const Carousel = ({ items, link, style }: CarouselProps) => {
  return (
    <Card.Container
      padding="0"
      focusedIndex={0}
      setFocusedIndex={function (): void {
        throw new Error("Function not implemented.");
      }}
    >
      {items.map((item: any) => (
        <Card.Item
          key={item.image?.url}
          image={item.image?.url}
          link={`/${link}/${item._id}`}
          style={style}
        >
          <Item.Column gap="var(--spacing-5)" width="70%" paddingLeft="var(--spacing-5)">
            <Card.Title title={item.title} />
            <Card.Date date={item.year} />
          </Item.Column>
        </Card.Item>
      ))}
    </Card.Container>
  );
};

export default Carousel;
