import Item from "../../../../components/ui/Item";
import Mobile from "../../../../components/ui/Mobile";

interface ArtistItemProps {
  id?: string;
  name?: string;
  image?: string;
  date?: string;
  link?: string;
  biography?: string;
}

const ArtistItem = ({
  name,
  image,
  date,
  link,
  biography,
}: ArtistItemProps) => {
  return (
    <Item.Container marginBottom="var(--spacing-5)">
      <Mobile.ImageDefault src={image || ""} alt={name || ""} />
      <Item.Column padding="20px">
        <Mobile.Title>{name}</Mobile.Title>
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
        <Mobile.Description>{biography}</Mobile.Description>
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

export default ArtistItem;
