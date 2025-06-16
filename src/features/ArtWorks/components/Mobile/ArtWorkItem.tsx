import Item from "../../../../components/ui/Item";
import Mobile from "../../../../components/ui/Mobile";
import { Link } from "react-router-dom";

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
    <Link
      to={link || "#"}
      style={{ textDecoration: "none", color: "inherit" }}
      aria-label={`Acessar detalhes da obra ${title}`}
    >
      <Item.Container marginBottom="var(--spacing-5)">
        <Mobile.ImageDefault src={image || ""} alt={title || ""} />
        <Item.Column padding="20px">
          <Mobile.Title>{title}</Mobile.Title>
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
          <Mobile.Subtitle>{author}</Mobile.Subtitle>
          <Mobile.Description>{description}</Mobile.Description>
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

export default ArtWorkItem;
