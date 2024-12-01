// components
import Mobile from "../../../../components/ui/Mobile";
import Item from "../../../../components/ui/Item";

// Hooks
import { useQuery } from "@tanstack/react-query";
import ArtWorkService from "../../api/ArtWorkService";
import ArtWorkList from "../../components/Mobile/ArtWorkList";
import { ArtWork } from "../../types/ArtWork";
import { useEffect } from "react";

const Artworks = () => {
  const {
    data: artWorks,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["artWorks/all"],
    queryFn: async () => await ArtWorkService.getAll<ArtWork>(),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Mobile.Loading />;
  }

  if (isError) {
    return <Mobile.Error />;
  }
  return (
    <section>
      <Mobile.Title
        style={{
          color: "var(--color-text)",
          marginTop: "var(--spacing-25)",
          paddingLeft: "20px",
        }}
      >
        Todas as Obras
      </Mobile.Title>
      <Item.Container>
        <Item.Column gap="var(--spacing-0)">
          {artWorks && <ArtWorkList artWork={artWorks?.data} />}{" "}
        </Item.Column>
      </Item.Container>
    </section>
  );
};

export default Artworks;
