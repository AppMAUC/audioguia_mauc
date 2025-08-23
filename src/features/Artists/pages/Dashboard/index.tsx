import { useEffect, useState } from "react";
import Back from "../../../../components/ui/Back";
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";
import AddButton from "../../../Admin/components/AddButton";
import ArtistList from "../../components/Admin/ArtistList";
import { useQuery } from "@tanstack/react-query";
import { ArtistService } from "../../api/ArtistService";
import { Artist } from "../../types/Artist";
import Mobile from "../../../../components/ui/Mobile";
import PaginationControls from "../../../../components/ui/Pagination/PaginationControls";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const artistService = new ArtistService();

  const {
    data: artists,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["artists/all", page],
    queryFn: async () => await artistService.getAll<Artist>(page),
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
        <Back>Artistas</Back>
        <AddButton link="/admin/artists/new" />
      </header>

      <section className={styles.section}>
        {artists && <ArtistList data={artists?.data} />}
      </section>

      {artists && (
        <PaginationControls
          page={page}
          setPage={setPage}
          hasNext={!!artists?.next}
          hasPrev={!!artists?.prev}
          totalPages={artists?.pages}
        />
      )}

    </div>
  );
};

export default Dashboard;
