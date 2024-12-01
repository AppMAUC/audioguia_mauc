import Item from "../../../../components/ui/Item";

interface ArtWorkItemProps {
  id: string;
  image: string;
  author: string;
  title: string;
  year: string;
  description: string;
}

const ArtWorkItem = ({
  image,
  title,
  author,
  year,
  description,
  id,
}: ArtWorkItemProps) => {
  return (
    <>
      <Item.BigContent>
        <Item.Row justify="flex-start">
          <Item.Image tam={true} src={image} alt="Imagem" />
          <Item.Row padding="var(--spacing-25)" width="100%">
            <Item.Column width="85%">
              <Item.Row
                align="center"
                gap="var(--spacing-10)"
                margin="var(--spacing-15)"
              >
                <Item.Title>{title}</Item.Title>
                <Item.OneDate initial="" date={year} />
              </Item.Row>
              <Item.Info name="Autor" value={author} />
              <Item.Subtitle>Sobre a Obra</Item.Subtitle>
              <Item.Description>{description}</Item.Description>
            </Item.Column>
            <Item.Button id={id} module="artworks">
              Editar
            </Item.Button>
          </Item.Row>
        </Item.Row>
      </Item.BigContent>
    </>
  );
};

export default ArtWorkItem;
