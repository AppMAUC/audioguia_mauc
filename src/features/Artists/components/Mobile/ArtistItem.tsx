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
    <article>
      <Link
        to={link || "#"}
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
        aria-label={`Ver mais detalhes do artista ${name ?? ""}`}
      >
        <Item.Container marginBottom="var(--spacing-5)">
          <Mobile.ImageDefault
            src={image || ""}
            alt={`Foto do artista ${name ?? ""}`}
          />

          <Item.Column padding="20px">
            {/* Mantendo Mobile.Title */}
            <Mobile.Title>{name}</Mobile.Title>

            {date && (
              <p
                style={{
                  marginTop: "var(--spacing-5)",
                  color: "var(--color-state)",
                  fontFamily: "var(--font-family-base)",
                  fontWeight: 600,
                }}
              >
                {date}
              </p>
            )}

            {biography && <Mobile.Description>{biography}</Mobile.Description>}

            <Item.Row
              justify="end"
              align="center"
              width="100%"
              marginTop="var(--spacing-5)"
            >
              <span aria-hidden="true" style={{ textDecoration: "underline" }}>
                Ver mais
              </span>
            </Item.Row>
          </Item.Column>
        </Item.Container>
      </Link>
    </article>
  );
};

export default ArtistItem;