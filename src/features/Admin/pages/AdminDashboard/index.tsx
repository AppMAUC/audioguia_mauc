import { useEffect } from "react";
import Back from "../../../../components/ui/Back";
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";
import AddButton from "../../../Admin/components/AddButton";
import AdminList from "../../components/Admin/AdminList";
import { useQuery } from "@tanstack/react-query";
import AdminService from "../../api/AdminService";
import Mobile from "../../../../components/ui/Mobile";

const Dashboard = () => {
  const {
    data: admins,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["admins/all"],
    queryFn: async () => await AdminService.getAll(),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Mobile.Loading />;
  }

  if (isError) {
    return <Mobile.Error404 />;
  }
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <Back>Administradores</Back>
        <AddButton link="/admin/register" />
      </header>
      <section className={styles.section}>
        {admins && <AdminList data={admins} />}{" "}
      </section>
    </div>
  );
};

export default Dashboard;
