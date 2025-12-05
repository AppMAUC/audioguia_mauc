// components
import Mobile from "../../../../components/ui/Mobile";
import Item from "../../../../components/ui/Item";
import PaginationControls from "../../../../components/ui/Pagination/PaginationControls";

// Hooks
import { useQuery } from "@tanstack/react-query";
import ExpositionService from "../../api/ExpositionService";
import ExpositionList from "../../components/Mobile/ExpositionList";
import { Exposition } from "../../types/Exposition";
import { useEffect, useRef, useState } from "react";

const Expositions = () => {
  const [page, setPage] = useState(1);

  const {
    data: expositions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["expositions/all", page],
    queryFn: async () => await ExpositionService.getAll<Exposition>(page),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const liveRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (expositions && liveRef.current) {
      const totalNaPagina = expositions?.data?.length ?? 0;
      const totalPaginas = expositions?.pages ?? 1;
      liveRef.current.textContent =
        `Página ${page} de ${totalPaginas}. ${totalNaPagina} exposições carregadas.`;
    }
  }, [expositions, page]);

  if (isLoading) return <Mobile.Loading />;

  if (isError) return <Mobile.Error />;

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
        Todas as Exposições
      </Mobile.Title>

      {/* Live region invisível para anunciar mudanças de página/quantidade */}
      <div
        ref={liveRef}
        aria-live="polite"
        style={{ position: "absolute", left: -9999, top: "auto" }}
      />

      <Item.Container>
        <Item.Column gap="var(--spacing-0)">
          <ExpositionList expositions={expositions?.data ?? []} />
        </Item.Column>
      </Item.Container>

      {expositions && (
        <PaginationControls
          page={page}
          setPage={setPage}
          hasNext={!!expositions?.next}
          hasPrev={!!expositions?.prev}
          totalPages={expositions?.pages}
        />
      )}

    </section>
  );
};

export default Expositions;
