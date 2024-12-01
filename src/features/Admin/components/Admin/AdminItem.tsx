import Item from "../../../../components/ui/Item";

interface AdminItemProps {
  id: string;
  name: string;
  image: string;
  accessLevel: number;
}

const AdminItem = ({ id, name, image, accessLevel }: AdminItemProps) => {
  return (
    <>
      <Item.ShortContent>
        <Item.Row align="center" gap="var(--spacing-10)">
          <Item.Image src={image} alt="Imagem" tam={false} />
          <Item.Title>{name}</Item.Title>
        </Item.Row>
        <Item.Info name="Nível de acesso" value={`${accessLevel}`} />
        <Item.Row justify="center">
          <Item.Button id={id} module="profile">Editar</Item.Button>
        </Item.Row>
      </Item.ShortContent>
    </>
  );
};

export default AdminItem;
