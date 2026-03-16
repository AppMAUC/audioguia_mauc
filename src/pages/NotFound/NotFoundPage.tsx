import { useAuth } from "../../features/Admin/hooks/useAuth";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import styles from "../../components/ui/Mobile/Mobile.module.css";
import { Error404Image } from "../../assets";
import Mobile from "../../components/ui/Mobile";
import Navbar from "../../components/navigation/Navbar";
import { useTranslation } from "../../features/Language/useTranslation";

const NotFoundPage = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className={styles.error}>
        <Error404Image className={styles.error_image} />
        <Mobile.Title
          style={{ fontSize: "var(--h1-size)", color: "var(--color-text)" }}
        >
          {t('notFound.title')}
        </Mobile.Title>
        <p
          style={{
            width: "70%",
            textAlign: "center",
            fontFamily: "var(--font-family-base)",
            fontSize: "var(--h3-size)",
            fontWeight: "bold",
            color: "var(--color-text-gray)",
            marginBottom: "var(--spacing-5)",
          }}
        >
          {t('notFound.message')}
        </p>

        <Button onClick={() => navigate(auth ? "/admin/dashboard" : "/")}>
          {t('notFound.backButton')}
        </Button>
      </div>
    </>
  );
};

export default NotFoundPage;