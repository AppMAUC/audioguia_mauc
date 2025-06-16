import { Link } from "react-router-dom";
import Item from "../../../../components/ui/Item";
import Mobile from "../../../../components/ui/Mobile";

interface ExpositionItemProps {
  id?: string;
  title?: string;
  image?: string;
  dateStarts?: string;
  dateEnds?: string;
  link?: string;
  description?: string;
}

const ExpositionItem = ({
  title,
  image,
  dateStarts,
  dateEnds,
  link,
  description,
}: ExpositionItemProps) => {
  return (
    <Link
      to={link || "#"}
      style={{ textDecoration: "none", color: "inherit" }}
      aria-label={`Exposição ${title}, de ${dateStarts} até ${dateEnds}. Clique para ver mais detalhes.`}
    >
      <Item.Container marginBottom="var(--spacing-5)" >
        <Mobile.ImageDefault src={image || ""} alt={title || ""} />
        <Item.Container
          padding="20px"
          display="flex"
          flexDirection="column"
          gap="var(--spacing-10)"
        >
          <Mobile.Title>{title}</Mobile.Title>
          <p
            style={{
              marginTop: "var(--spacing-5)",
              color: "var(--color-state)",
              fontFamily: "var(--font-family-base)",
              fontWeight: "bold",
            }}
          >
            {dateStarts} - {dateEnds}
          </p>
          <Mobile.Description>{description}</Mobile.Description>
          {/* Opcional: se quiser manter o botão "Ver mais" */}
          {/* <Item.Row
            justify="end"
            align="center"
            width="100%"
            marginTop="var(--spacing-5)"
          >
            <Mobile.Redirect link={link}>Ver mais</Mobile.Redirect>
          </Item.Row> */}
        </Item.Container>
      </Item.Container>
    </Link>
  );
};

export default ExpositionItem;
