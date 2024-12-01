import { useEffect } from "react";
import Back from "../../../../components/ui/Back";
import ArtWorkList from "../../components/Admin/ArtWorkList";
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";
import AddButton from "../../../Admin/components/AddButton";
import { useQuery } from "@tanstack/react-query";
import ArtWorkService from "../../api/ArtWorkService";
import { ArtWork } from "../../types/ArtWork";
import Mobile from "../../../../components/ui/Mobile";

const Dashboard = () => {
  const {
    data: artWorks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["artWorks/all"],
    queryFn: async () => await ArtWorkService.getAll<ArtWork>(),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    </div>
  );
};

export default Dashboard;
