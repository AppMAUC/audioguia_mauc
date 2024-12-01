import Item from "../../../../components/ui/Item";

interface ArtistItemProps {
  id: string;
  name: string;
  image: string;
  description: string;
}

const ArtistItem = ({ image, description, id, name }: ArtistItemProps) => {
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
                <Item.Title>{name}</Item.Title>
              </Item.Row>
              <Item.Subtitle>Descrição</Item.Subtitle>
              <Item.Description>{description}</Item.Description>
            </Item.Column>
            <Item.Button id={id} module="artists">
              Editar
            </Item.Button>
          </Item.Row>
        </Item.Row>
      </Item.BigContent>
    </>
  );
};

export default ArtistItem;
