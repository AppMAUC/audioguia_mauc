import Mobile from "../../../components/ui/Mobile";
import Item from "../../../components/ui/Item";
import { useTranslation } from "../../../features/Language/useTranslation";

const Author = ({
  image,
  name,
  id,
}: {
  image: string;
  name: string;
  id: string;
}) => {
  const { t } = useTranslation();

  return (
    <Mobile.Author>
      <Item.Row
        align="center"
        width="100%"
        justify="start"
        gap="var(--spacing-15)"
      >
        <Mobile.CustomImage
          src={image}
          alt={t('artists.authorImageAlt')}
          width={"70px"}
          height="70px"
          borderRadius="50%"
        />
        <Item.Column>
          <Mobile.AuthorTitle>{name}</Mobile.AuthorTitle>
          <Mobile.Link
            link={`/artists/${id}`}
            fontStyle="base"
            fontSize="--title-like-4"
          >
            {t('artists.seeAboutArtist')}
          </Mobile.Link>
        </Item.Column>
      </Item.Row>
    </Mobile.Author>
  );
};

export default Author;