import { useEffect, useState } from "react";
import Back from "../../../../components/ui/Back";
import ArtWorkList from "../../components/Admin/ArtWorkList";
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";
import AddButton from "../../../Admin/components/AddButton";
import { useQuery } from "@tanstack/react-query";
import ArtWorkService from "../../api/ArtWorkService";
import { ArtWork } from "../../types/ArtWork";
import Mobile from "../../../../components/ui/Mobile";

const Dashboard = () => {
  const [page, setPage] = useState(1);

  const {
    data: artWorks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["artWorks/all", page],
    queryFn: async () => await ArtWorkService.getAll<ArtWork>(page),
    // keepPreviousData: true, // REMOVIDO para evitar erro
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
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <Back>Obras de Arte</Back>
        <AddButton link="/admin/artworks/new" />
      </header>
      <section className={styles.section}>
        {artWorks && <ArtWorkList data={artWorks.data} />}
      </section>

      <div className="pagination-buttons" style={{ marginTop: "1rem", textAlign: "center" }}>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={!artWorks?.prev}
          style={{ marginRight: "1rem" }}
        >
          Anterior
        </button>

        <span>Página {page} de {artWorks?.pages || "?"}</span>

        <button
          onClick={() => setPage((old) => (artWorks?.next ? old + 1 : old))}
          disabled={!artWorks?.next}
          style={{ marginLeft: "1rem" }}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
