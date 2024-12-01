import Mobile from "../../../components/ui/Mobile";
import Item from "../../../components/ui/Item";

const Author = ({
  image,
  name,
  id,
}: {
  image: string;
  name: string;
  id: string;
}) => {
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
          alt="Imagem"
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
            Ver sobre o artista
          </Mobile.Link>
        </Item.Column>
      </Item.Row>
    </Mobile.Author>
  );
};

export default Author;
