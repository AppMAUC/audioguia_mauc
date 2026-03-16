import { Link } from "react-router-dom";
import Item from "../../../../components/ui/Item";
import Mobile from "../../../../components/ui/Mobile";
import { useTranslation } from "../../../../features/Language/useTranslation";

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
  const { t } = useTranslation();

  return (
    <Link
      to={link || "#"}
      style={{ textDecoration: "none", color: "inherit" }}
      aria-label={t('expositions.linkAriaLabel', { title: title || '' })}
    >
      <Item.Container marginBottom="var(--spacing-5)" >
        <Mobile.ImageDefault
          src={image || ""}
          alt={title
            ? t('expositions.imageAlt', { title })
            : t('expositions.imageAltDefault')
          }
        />
        <Item.Container
          padding="calc(var(--spacing-15) + var(--spacing-5)) 20px"
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
            aria-label={t('expositions.periodAriaLabel', {
              start: dateStarts || '',
              end: dateEnds || ''
            })}
          >
            {dateStarts} - {dateEnds}
          </p>
          <Mobile.Description>{description}</Mobile.Description>
        </Item.Container>
      </Item.Container>
    </Link>
  );
};

export default ExpositionItem;