// components
import Mobile from "../../../../components/ui/Mobile";
import Item from "../../../../components/ui/Item";
import PaginationControls from "../../../../components/ui/Pagination/PaginationControls";

// Hooks
import { useQuery } from "@tanstack/react-query";
import ArtistService from "../../api/ArtistService";
import ArtistList from "../../components/Mobile/ArtistList";
import { Artist } from "../../types/Artist";
import { useEffect, useRef, useState } from "react";

const Artists = () => {
  const [page, setPage] = useState(1);

  const {
    data: artists,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["artists/all", page],
    queryFn: async () => await ArtistService.getAll<Artist>(page),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const liveRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (artists && liveRef.current) {
      const totalNaPagina = artists?.data?.length ?? 0;
      const totalPaginas = artists?.pages ?? 1;
      liveRef.current.textContent =
        `Página ${page} de ${totalPaginas}. ${totalNaPagina} artistas carregados.`;
    }
  }, [artists, page]);

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
        Todos os Artistas
      </Mobile.Title>

      <div
        ref={liveRef}
        aria-live="polite"
        style={{ position: "absolute", left: -9999, top: "auto" }}
      />

      <Item.Container>
        <Item.Column gap="var(--spacing-0)">
          <ArtistList artists={artists?.data ?? []} />
        </Item.Column>
      </Item.Container>

      {artists && (
        <PaginationControls
          page={page}
          setPage={setPage}
          hasNext={!!artists?.next}
          hasPrev={!!artists?.prev}
          totalPages={artists?.pages}
        />
      )}

    </section>
  );
};

export default Artists;
