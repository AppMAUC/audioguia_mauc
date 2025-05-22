import { useSearchParams } from "react-router-dom";
import Item from "../../components/ui/Item";
import Mobile from "../../components/ui/Mobile";
import ArtWorkList from "../../features/ArtWorks/components/Mobile/ArtWorkList";
import { useQuery } from "@tanstack/react-query";
import apiService from "../../services/api/apiService";
import { Exposition } from "../../features/Expositions/types/Exposition";
import { ArtWork } from "../../features/ArtWorks/types/ArtWork";
import { Artist } from "../../features/Artists/types/Artist";
import Author from "../../features/Artists/components/Author";
import { useEffect, useState } from "react";
import { Error404Image } from "../../assets";

const Search = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q");
  const [artWorks, setartWorks] = useState<ArtWork[] | null>(null);
  const [artists, setArtists] = useState<Artist[] | null>(null);

  const { data: result, isLoading } = useQuery({
    queryKey: ["search", search],
    queryFn: async () =>
      await apiService.search<Exposition | ArtWork | Artist>("/", search || ""),
  });

  useEffect(() => {
    if (result?.data) {
      setartWorks(
        result.data.filter(
          (item): item is ArtWork => (item as ArtWork).title !== undefined
        ) as ArtWork[]
      );
    }
    if (result?.data) {
      setArtists(
        result.data.filter(
          (item): item is Artist => (item as Artist).name !== undefined
        ) as Artist[]
      );
    }
  }, [result?.data]);

  if (isLoading) return <Mobile.Loading />;

  if (!result)
    return (
      <Item.Container display="flex" flexDirection="column" alignItems="center" justifyContent="center" marginTop="30%">
        <Error404Image />
        <h1
          style={{
            textAlign: "center",
            color: "var(--color-state)",
            fontFamily: "var(--font-family-base)",
            fontWeight: "bold",
            marginTop: "140px",
          }}
        >
          Nenhum Resultado econtrado...
        </h1>
      </Item.Container>
    );

  return (
    <>
      <Item.Container padding="20px" marginTop= "140px">
        {artists && artists?.length > 0 && (
          <Mobile.Title style={{ color: "var(--color-text)" }}>
            Artistas
          </Mobile.Title>
        )}
        {artists &&
          artists.map((item) => (
            <>
              <Author
                key={item._id}
                image={item.image.url}
                name={item.name}
                id={item._id}
              />
            </>
          ))}
      </Item.Container>
      <Item.Container>
        {artWorks && (
          <>
            <Mobile.Title
              style={{ color: "var(--color-text)", paddingLeft: "20px" }}
            >
              Obras
            </Mobile.Title>
            <ArtWorkList artWork={artWorks as ArtWork[]} />
          </>
        )}
      </Item.Container>
    </>
  );
};

export default Search;
