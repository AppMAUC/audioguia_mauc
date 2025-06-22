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
  console.log("Página atual:", page);

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

      <div className="pagination-buttons" style={{ fontFamily: "Lato, sans-serif", marginTop: "1rem", textAlign: "center" }}>
        <button
          onClick={() => {
            if (page > 1) setPage(page - 1);
          }}
          disabled={page <= 1}
          style={{
            marginRight: "1rem",
            cursor: page <= 1 ? "not-allowed" : "pointer",
          }}
        >
          Anterior
        </button>

        <span style={{ fontFamily: "Lato, sans-serif" }}>
          Página {page} de {artWorks?.pages || "?"}
        </span>

        <button
          onClick={() => {
            if (artWorks?.next) setPage(page + 1);
          }}
          disabled={!artWorks?.next}
          style={{
            marginLeft: "1rem",
            cursor: artWorks?.next ? "pointer" : "not-allowed",
          }}
        >
          Próximo
        </button>
      </div>

    </div>
  );
};

export default Dashboard;
