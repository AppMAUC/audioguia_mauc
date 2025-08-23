// components
import Mobile from "../../../../components/ui/Mobile";
import Item from "../../../../components/ui/Item";
import PaginationControls from "../../../../components/ui/Pagination/PaginationControls";

// Hooks
import { useQuery } from "@tanstack/react-query";
import ExpositionService from "../../api/ExpositionService";
import ExpositionList from "../../components/Mobile/ExpositionList";
import { Exposition } from "../../types/Exposition";
import { useEffect, useState } from "react";

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

  if (isLoading) return <Mobile.Loading />;

  if (isError) return <Mobile.Error />;

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
        Todas as Exposições
      </Mobile.Title>

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
