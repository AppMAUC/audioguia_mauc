import Item from "../../../../components/ui/Item";
import Mobile from "../../../../components/ui/Mobile";
import { Link } from "react-router-dom";
import { useTranslation } from "../../../../features/Language/useTranslation";
import { useLanguage } from "../../../../features/Language/useLanguage";

interface ArtWorkItemProps {
  id?: string;
  title?: string;
  title_en?: string;
  image?: string;
  author?: string;
  date?: string;
  link?: string;
  description?: string;
  description_en?: string;
}

const ArtWorkItem = ({
  title,
  title_en,
  image,
  author,
  date,
  link,
  description,
  description_en,
}: ArtWorkItemProps) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const getText = (ptText?: string, enText?: string) => {
    return language === 'en' && enText ? enText : ptText;
  };

  const href = link || "#";
  const imgAlt = title ? title : t('artworks.imageAlt');

  return (
    <Link
      to={href}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Item.Container marginBottom="var(--spacing-5)">
        <Mobile.ImageDefault src={image || ""} alt={imgAlt} />
        <Item.Column padding="calc(var(--spacing-15) + var(--spacing-5)) 20px">
          <Mobile.Title>{getText(title, title_en)}</Mobile.Title>
          <p
            style={{
              marginTop: "var(--spacing-5)",
              color: "var(--color-state)",
              fontFamily: "var(--font-family-base)",
              fontWeight: "600",
            }}
          >
            {date}
          </p>

          <Mobile.Subtitle>{author}</Mobile.Subtitle>
          <Mobile.Description> {getText(description, description_en)}</Mobile.Description>
          <Item.Row
            justify="end"
            align="center"
            width="100%"
            marginTop="var(--spacing-5)"
          >
            <span aria-hidden="true" style={{ textDecoration: "underline", fontSize: "var(--p-size", fontFamily: "var(--font-family-base)" }}>
              {t('artworks.seeMore')}
            </span>
          </Item.Row>
        </Item.Column>
      </Item.Container>
    </Link>
  );
};

export default ArtWorkItem;