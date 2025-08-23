import { useEffect, useState } from "react";
import Back from "../../../../components/ui/Back";
import ExpositionList from "../../components/Admin/ExpositionList";
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";
import AddButton from "../../../Admin/components/AddButton";
import ExpositionService from "../../api/ExpositionService";
import { Exposition } from "../../types/Exposition";
import { useQuery } from "@tanstack/react-query";
import Mobile from "../../../../components/ui/Mobile";
import PaginationControls from "../../../../components/ui/Pagination/PaginationControls";

const Dashboard = () => {
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
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <Back>Exposições</Back>
        <AddButton link="/admin/expositions/new" />
      </header>

      <section className={styles.section}>
        <h2 className={styles.h1}>Exposições de longa duração</h2>
        {expositions && (
          <ExpositionList data={expositions?.data} type={1} />
        )}{" "}
      </section>

      <section className={styles.section}>
        <h2 className={styles.h1}>Exposições de curta duração</h2>
        {expositions && <ExpositionList data={expositions?.data} type={2} />}
      </section>

      {expositions && (
        <PaginationControls
          page={page}
          setPage={setPage}
          hasNext={!!expositions?.next}
          hasPrev={!!expositions?.prev}
          totalPages={expositions?.pages}
        />
      )}
    </div>
  );
};

export default Dashboard;
