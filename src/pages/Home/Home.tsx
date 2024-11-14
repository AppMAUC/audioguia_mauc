import { useAuth } from "../../features/Admin/hooks/useAuth";
import AccessibilityMenu from "../../features/Accessibility/AccessibilityMenu";

function Home() {
  const data = {
    email: "admin@admin.com",
    password: "12345",
  };
  const { login, logout } = useAuth();
  const handleLogin = async () => {
    await login(data);
  };
  const handleLogout = async () => {
    await logout();
  };
  return (
    <div>
      <h1>AppMauc</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <AccessibilityMenu />
    </div>
  );
}

export default Home;
