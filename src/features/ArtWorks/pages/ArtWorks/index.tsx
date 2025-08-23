// components
import Mobile from "../../../../components/ui/Mobile";
import Item from "../../../../components/ui/Item";
import PaginationControls from "../../../../components/ui/Pagination/PaginationControls";

// Hooks
import { useQuery } from "@tanstack/react-query";
import ArtWorkService from "../../api/ArtWorkService";
import ArtWorkList from "../../components/Mobile/ArtWorkList";
import { ArtWork } from "../../types/ArtWork";
import { useEffect, useState } from "react";

const Artworks = () => {
  const [page, setPage] = useState(1);

  const {
    data: artWorks,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["artWorks/all", page],
    queryFn: async () => await ArtWorkService.getAll<ArtWork>(page),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

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
          marginTop: "140px",
          marginBottom: "var(--spacing-10-md)",
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

      {artWorks && (
        <PaginationControls
          page={page}
          setPage={setPage}
          hasNext={!!artWorks?.next}
          hasPrev={!!artWorks?.prev}
          totalPages={artWorks?.pages}
        />
      )}
    </section>
  );
};

export default Artworks;
