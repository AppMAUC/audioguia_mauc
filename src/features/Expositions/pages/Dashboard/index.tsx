import { useEffect } from "react";
import Back from "../../../../components/ui/Back";
import ExpositionList from "../../components/ExpositionList";
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";
import AddButton from "../../../Admin/components/AddButton";

const Dashboard = () => {
  const expositions = [
    {
      image: {
        name: "image",
        size: 0,
        key: "image",
        url: "https://via.placeholder.com/150",
      },
      title: "Exposition 1",
      startDate: "21/21/2024",
      endDate: "21/21/2024",
      place: "Sala X",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec puras vel libero tincidunt ultricies. Nullam nec puras vel libero tincidunt ultricies. Nullam nec puras vel libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec puras vel libero tincidunt ultricies. Nullam nec puras vel libero tincidunt ultricies. Nullam nec puras vel libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec puras vel libero tincidunt ultricies. Nullam nec puras vel libero tincidunt ultricies. Nullam nec puras vel libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec puras vel libero tincidunt ultricies. Nullam nec puras vel libero tincidunt ultricies. Nullam nec puras vel libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec puras vel libero tincidunt ultricies. Nullam nec puras vel libero tincidunt ultricies. Nullam nec puras vel libero",
      _id: "1",
      type: 1,
      artWorks: [],
      dateStarts: "21/21/2024",
      dateEnds: "21/21/2024",
      archived: false,
    },
    {
      archived: false,
      image: {
        name: "image",
        size: 0,
        key: "image",
        url: "https://via.placeholder.com/150",
      },
      title: "Exposition 1",
      startDate: "21/21/2024",
      endDate: "21/21/2024",
      place: "Sala X",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec puras vel libero tincidunt ultricies. Nullam nec puras vel libero tincidunt ultricies. Nullam nec puras vel libero",
      _id: "2",
      type: 2,
      artWorks: [],
      dateStarts: "21/21/2024",
      dateEnds: "21/21/2024",
    },
    {
      archived: false,
      image: {
        name: "image",
        size: 0,
        key: "image",
        url: "https://via.placeholder.com/150",
      },
      title: "Exposition 1",
      startDate: "21/21/2024",
      endDate: "21/21/2024",
      place: "Sala X",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec puras vel libero tincidunt ultricies. Nullam nec puras vel libero tincidunt ultricies. Nullam nec puras vel libero",
      _id: "3",
      type: 1,
      artWorks: [],
      dateStarts: "21/21/2024",
      dateEnds: "21/21/2024",
    },
    {
      image: {
        name: "image",
        size: 0,
        key: "image",
        url: "https://via.placeholder.com/150",
      },
      title: "Exposition 1",
      startDate: "21/21/2024",
      endDate: "21/21/2024",
      place: "Sala X",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec puras vel libero tincidunt ultricies. Nullam nec puras vel libero tincidunt ultricies. Nullam nec puras vel libero",
      _id: "4",
      type: 2,
      artWorks: [],
      dateStarts: "21/21/2024",
      dateEnds: "21/21/2024",
      archived: false,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <Back>Exposições</Back>
        <AddButton link="/admin/expositions/new" />
      </header>
      <section className={styles.section}>
        <h2 className={styles.h1}>Exposições de longa duração</h2>
        <ExpositionList data={expositions} type={1} />
      </section>
      <section className={styles.section}>
        <h2 className={styles.h1}>Exposições de curta duração</h2>
        <ExpositionList data={expositions} type={2} />
      </section>
    </div>
  );
};

export default Dashboard;
