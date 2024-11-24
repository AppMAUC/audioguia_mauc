import { useEffect } from "react";
import Back from "../../../../components/ui/Back";
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";
import AddButton from "../../../Admin/components/AddButton";
import ArtistList from "../../components/ArtistList";

const Dashboard = () => {
  const artists = [
    {
      image: {
        url: "https://via.placeholder.com/150",
        name: "Artist 1",
        size: 1,
        key: "1",
      },
      _id: "1",
      name: "Artist 1",
      artWorks: [],
      biography: "Biography of Artist 1",
      audioGuia: [],
      birthDate: "1970-01-01",
    },
    {
      image: {
        url: "https://via.placeholder.com/150",
        name: "Artist 2",
        size: 1,
        key: "1",
      },
      _id: "2",
      name: "Artist 2",
      artWorks: [],
      biography: "Biography of Artist 2",
      audioGuia: [],
      birthDate: "1980-02-02",
    },
    {
      image: {
        url: "https://via.placeholder.com/150",
        name: "Artist 1",
        size: 1,
        key: "1",
      },
      _id: "3",
      name: "Artist 1",
      artWorks: [],
      biography: "Biography of Artist 1",
      audioGuia: [],
      birthDate: "1970-01-01",
    },
    {
      image: {
        url: "https://via.placeholder.com/150",
        name: "Artist 2",
        size: 1,
        key: "1",
      },
      _id: "4",
      name: "Artist 2",
      artWorks: [],
      biography: "Biography of Artist 2",
      audioGuia: [],
      birthDate: "1980-02-02",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <Back>Artistas</Back>
        <AddButton link="/admin/artists/new" />
      </header>
      <section className={styles.section}>
        <ArtistList data={artists} />
      </section>
    </div>
  );
};

export default Dashboard;
