import Item from "../../../../components/ui/Item";
import Mobile from "../../../../components/ui/Mobile";
import { Link } from "react-router-dom";

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
    <Link
      to={link || "#"}
      style={{ textDecoration: "none", color: "inherit" }}
      aria-label={`Acessar detalhes do artista ${name}`}
    >
      <Item.Container marginBottom="var(--spacing-5)">
        <Mobile.ImageDefault src={image || ""} alt={name || ""} />
        <Item.Column padding="20px">
          <Mobile.Title>{name}</Mobile.Title>
          <p
            style={{
              marginTop: "var(--spacing-5)",
              color: "var(--color-state)",
              fontFamily: "var(--font-family-base)",
              fontWeight: "600", // ou "bold" se preferir
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
            <span style={{ textDecoration: "underline" }}>Ver mais</span>
          </Item.Row>
        </Item.Column>
      </Item.Container>
    </Link>
  );
};

export default ArtistItem;
