import { Link } from "react-router-dom";
import { useAuth } from "../../features/Admin/hooks/useAuth";

const NotFoundPage = () => {
  const { auth } = useAuth();
  return (
    <div>
      <h1>404 Not Found</h1>
      <Link to={auth ? "/admin/dashboard" : "/"}>Home</Link>
    </div>
  );
};

export default NotFoundPage;
