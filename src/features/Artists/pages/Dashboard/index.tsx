import { useEffect } from "react";
import Back from "../../../../components/ui/Back";
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";
import AddButton from "../../../Admin/components/AddButton";
import ArtistList from "../../components/Admin/ArtistList";
import { useQuery } from "@tanstack/react-query";
import { ArtistService } from "../../api/ArtistService";
import { Artist } from "../../types/Artist";
import Mobile from "../../../../components/ui/Mobile";

const Dashboard = () => {
  const artistService = new ArtistService();
  const {
    data: artists,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["artists/all"],
    queryFn: async () => await artistService.getAll<Artist>(),
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
        <Back>Artistas</Back>
        <AddButton link="/admin/artists/new" />
      </header>
      <section className={styles.section}>
        {artists && <ArtistList data={artists?.data} />}
      </section>
    </div>
  );
};

export default Dashboard;
