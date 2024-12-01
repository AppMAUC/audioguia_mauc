// components
import Mobile from "../../../../components/ui/Mobile";
import Item from "../../../../components/ui/Item";

// Hooks
import { useQuery } from "@tanstack/react-query";
import ArtistService from "../../api/ArtistService";
import ArtistList from "../../components/Mobile/ArtistList";
import { Artist } from "../../types/Artist";
import { useEffect } from "react";

const Artists = () => {
  const {
    data: artists,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["artists/all"],
    queryFn: async () => await ArtistService.getAll<Artist>(),
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
        Todos os Artistas
      </Mobile.Title>
      <Item.Container>
        <Item.Column gap="var(--spacing-0)">
          <ArtistList artists={artists?.data ?? []} />
        </Item.Column>
      </Item.Container>
    </section>
  );
};

export default Artists;
