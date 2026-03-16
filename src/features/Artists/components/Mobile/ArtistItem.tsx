import Item from "../../../../components/ui/Item";
import Mobile from "../../../../components/ui/Mobile";
import { Link } from "react-router-dom";
import { useTranslation } from "../../../../features/Language/useTranslation";

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
  const { t } = useTranslation();
  const href = link || "#";

  return (
    <article>
      <Link
        to={href}
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
      >
        <Item.Container marginBottom="var(--spacing-5)">
          <Mobile.ImageDefault
            src={image || ""}
            alt={t('artists.imageAlt', { name: name ?? "" })}
          />
          <Item.Column padding="calc(var(--spacing-15) + var(--spacing-5)) 20px">

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
              <span
                aria-hidden="true"
                style={{
                  fontSize: "var(--p-size)",
                  fontFamily: "var(--font-family-base)"
                }}
              >
                {t('artists.seeMore')}
              </span>
            </Item.Row>
          </Item.Column>
        </Item.Container>
      </Link>
    </article>
  );
};

export default ArtistItem;