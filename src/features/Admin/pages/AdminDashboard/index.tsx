import { useEffect } from "react";
import Back from "../../../../components/ui/Back";
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";
import AddButton from "../../../Admin/components/AddButton";
import AdminList from "../../components/AdminList";
import { useAuth } from "../../hooks/useAuth";
import { Admin } from "../../types/Admin";

const Dashboard = () => {
  const { currentAdmin } = useAuth();
  const admins = [
    {
      _id: "1",
      name: "Admin 1",
      email: "email@example.com",
      accessLevel: 1,
      image: {
        name: "image.jpg",
        size: 1024,
        key: "123456",
        url: "https://via.placeholder.com/150",
      },
    },
    {
      _id: "2",
      name: "Admin 2",
      email: "email@example.com",
      accessLevel: 1,
      image: {
        name: "image.jpg",
        size: 1024,
        key: "123456",
        url: "https://via.placeholder.com/150",
      },
    },
    {
      _id: "3",
      name: "Admin 3",
      email: "email@example.com",
      accessLevel: 1,
      image: {
        name: "image.jpg",
        size: 1024,
        key: "123456",
        url: "https://via.placeholder.com/150",
      },
    },
    {
      _id: "4",
      name: "Admin 4",
      email: "email@example.com",
      accessLevel: 1,
      image: {
        name: "image.jpg",
        size: 1024,
        key: "123456",
        url: "https://via.placeholder.com/150",
      },
    },
    {
      _id: "5",
      name: "Admin 5",
      email: "email@example.com",
      accessLevel: 1,
      image: {
        name: "image.jpg",
        size: 1024,
        key: "123456",
        url: "https://via.placeholder.com/150",
      },
    },
    currentAdmin as Admin,
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <Back>Administradores</Back>
        <AddButton link="/admin/register" />
      </header>
      <section className={styles.section}>
        <AdminList data={admins} />
      </section>
    </div>
  );
};

export default Dashboard;
