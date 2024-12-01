import Item from "../../../../components/ui/Item";

interface ExpositionItemProps {
  id: string;
  image: string;
  title: string;
  startDate: string;
  endDate: string;
  place: string;
  description: string;
  type: number;
}

const ExpositionItem = ({
  image,
  title,
  startDate,
  endDate,
  place,
  description,
  type,
  id,
}: ExpositionItemProps) => {
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
                {type === 1 ? (
                  <Item.OneDate date={startDate} />
                ) : (
                  <Item.TwoDate start={startDate} end={endDate}>
                    até
                  </Item.TwoDate>
                )}
              </Item.Row>
              <Item.Info name="Lugar" value={place} />
              <Item.Subtitle>Descrição</Item.Subtitle>
              <Item.Description>{description}</Item.Description>
            </Item.Column>
            <Item.Button id={id} module="expositions">Editar</Item.Button>
          </Item.Row>
        </Item.Row>
      </Item.BigContent>
    </>
  );
};

export default ExpositionItem;
