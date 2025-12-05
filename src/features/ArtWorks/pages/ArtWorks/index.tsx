// components
import Mobile from "../../../../components/ui/Mobile";
import Item from "../../../../components/ui/Item";
import PaginationControls from "../../../../components/ui/Pagination/PaginationControls";

// Hooks
import { useQuery } from "@tanstack/react-query";
import ArtWorkService from "../../api/ArtWorkService";
import ArtWorkList from "../../components/Mobile/ArtWorkList";
import { ArtWork } from "../../types/ArtWork";
import { useEffect, useRef, useState } from "react";

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

  const liveRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (artWorks && liveRef.current) {
      const totalNaPagina = artWorks?.data?.length ?? 0;
      const totalPaginas = artWorks?.pages ?? 1;
      liveRef.current.textContent =
        `Página ${page} de ${totalPaginas}. ${totalNaPagina} obras carregadas.`;
    }
  }, [artWorks, page]);

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
          marginTop: "clamp(8.75rem, calc(5 * var(--spacing-25) + var(--spacing-15)), 9.375rem)",
          marginBottom: "var(--spacing-10)",
          paddingLeft: "20px",
        }}
      >
        Todas as Obras
      </Mobile.Title>

      <div
        ref={liveRef}
        aria-live="polite"
        style={{ position: "absolute", left: -9999, top: "auto" }}
      />

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
