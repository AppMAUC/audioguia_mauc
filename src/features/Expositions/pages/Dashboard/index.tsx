import { useEffect } from "react";
import Back from "../../../../components/ui/Back";
import ExpositionList from "../../components/Admin/ExpositionList";
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";
import AddButton from "../../../Admin/components/AddButton";
import ExpositionService from "../../api/ExpositionService";
import { Exposition } from "../../types/Exposition";
import { useQuery } from "@tanstack/react-query";
import Mobile from "../../../../components/ui/Mobile";

const Dashboard = () => {
  const {
    data: expositions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["expositions/all"],
    queryFn: async () => await ExpositionService.getAll<Exposition>(),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    </div>
  );
};

export default Dashboard;
