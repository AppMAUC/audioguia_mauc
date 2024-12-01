import Item from "../../../../components/ui/Item";
import Mobile from "../../../../components/ui/Mobile";

interface ArtWorkItemProps {
  id?: string;
  title?: string;
  image?: string;
  author?: string;
  date?: string;
  link?: string;
  description?: string;
}

const ArtWorkItem = ({
  title,
  image,
  author,
  date,
  link,
  description,
}: ArtWorkItemProps) => {
  return (
    <Item.Container marginBottom="var(--spacing-5)">
      <Mobile.ImageDefault src={image || ""} alt={title || ""} />
      <Item.Column padding="20px">
        <Mobile.Title>{title}</Mobile.Title>
        <p
          style={{
            marginTop: "var(--spacing-5)",
            color: "var(--color-state)",
            fontFamily: "var(--font-family-base)",
            fontWeight: "semibold",
          }}
        >
          {date}
        </p>
        <Mobile.Subtitle>{author}</Mobile.Subtitle>
        <Mobile.Description>{description}</Mobile.Description>
        <Item.Row
          justify="end"
          align="center"
          width="100%"
          marginTop="var(--spacing-5)"
        >
          <Mobile.Redirect link={link || "#"}>Ver mais</Mobile.Redirect>
        </Item.Row>
      </Item.Column>
    </Item.Container>
  );
};

export default ArtWorkItem;
