// components
import Mobile from "../../../../components/ui/Mobile";
import Item from "../../../../components/ui/Item";

// Hooks
import { useQuery } from "@tanstack/react-query";
import ExpositionService from "../../api/ExpositionService";
import ExpositionList from "../../components/Mobile/ExpositionList";
import { Exposition } from "../../types/Exposition";
import { useEffect } from "react";

const Expositions = () => {
  const {
    data: expositions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["expositions/all"],
    queryFn: async () => await ExpositionService.getAll<Exposition>(),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <Mobile.Loading />;

  if (isError) return <Mobile.Error />;

  return (
    <section>
      <Mobile.Title
        style={{
          color: "var(--color-text)",
          marginTop: "var(--spacing-25)",
          paddingLeft: "20px",
        }}
      >
        Todas as Exposições
      </Mobile.Title>
      <Item.Container>
        <Item.Column gap="var(--spacing-0)">
          <ExpositionList expositions={expositions?.data ?? []} />
        </Item.Column>
      </Item.Container>
    </section>
  );
};

export default Expositions;
