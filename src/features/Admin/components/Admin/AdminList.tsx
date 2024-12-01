import { Admin } from "../../types/Admin";
import AdminItem from "./AdminItem";
import styles from "../../../../components/ui/Item/Item.module.css";

interface AdminListProps {
  data: Admin[];
}

const AdminList = ({ data }: AdminListProps) => {
  return (
    <div className={styles.grid}>
      {data.map((item: Admin) => (
        <AdminItem
          key={item._id}
          id={item._id}
          image={item.image.url}
          name={item.name}
          accessLevel={item.accessLevel}
        />
      ))}
    </div>
  );
};

export default AdminList;
