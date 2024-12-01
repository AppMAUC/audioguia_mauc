import { useEffect, useState } from "react";
import Back from "../../../../components/ui/Back";
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";
import profile from "./Profile.module.css";
import AddButton from "../../../Admin/components/AddButton";
import AdminList from "../../components/Admin/AdminList";
import { useQuery } from "@tanstack/react-query";
import AdminService from "../../api/AdminService";
import Mobile from "../../../../components/ui/Mobile";
import {
  // DeleteIcon,
  EditPenIcon,
  LineElement,
  LogoutIcon,
  ProfileIcon,
} from "../../../../assets";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentAdmin: data } = useAuth();
  const [currentAdmin, setcurrentAdmin] = useState(data);
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

  useEffect(() => {
    if (admins) {
      setcurrentAdmin(admins.filter((admin) => admin._id === data?._id)[0]);
    }
  }, [admins]);

  if (isLoading) {
    return <Mobile.Loading />;
  }

  if (isError) {
    return <Mobile.Error />;
  }
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <Back>Perfil</Back>
        {currentAdmin?.accessLevel == 1 && (
          <AddButton link="/admin/register" />
        )}{" "}
      </header>
      <section className={profile.section}>
        <ProfileImage src={currentAdmin?.image.url || ""} />
        <Information
          name={currentAdmin?.name}
          email={currentAdmin?.email}
          accessLevel={`${currentAdmin?.accessLevel}`}
        />
        <Actions
          id={currentAdmin?._id || ""}
          accessLevel={currentAdmin?.accessLevel || 2}
        />
      </section>
      {currentAdmin?.accessLevel == 1 && (
        <>
          <Mobile.Title
            style={{
              fontSize: "var(--title-like-1)",
              fontWeight: "bold",
              color: "var(--color-text)",
              margin: "1rem 0",
            }}
          >
            Administradores
          </Mobile.Title>
          <section className={styles.section}>
            {admins && <AdminList data={admins} />}{" "}
          </section>
        </>
      )}
    </div>
  );
};

const ProfileImage = ({ src }: { src: string }) => {
  if (src) {
    return (
      <img className={profile.profile_image} src={src} alt="Foto de perfil" />
    );
  }

  return <ProfileIcon className={profile.profile_icon} />;
};

const Information = ({
  name,
  email,
  accessLevel,
}: {
  name?: string;
  email?: string;
  accessLevel?: string;
}) => {
  return (
    <div className={profile.information}>
      <Info label="Nome" value={name || ""} />
      <Info label="E-mail" value={email || ""} />
      <Info label="Nível de acesso" value={accessLevel || ""} />
    </div>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className={profile.info_div}>
      <h2 className={profile.info_label}>{label}</h2>
      <p className={profile.info}>{value}</p>
    </div>
  );
};

const Actions = ({ id }: { id: string; accessLevel?: number }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // const handleDelete = () => {
  //   console.log("deletar");
  // };

  return (
    <div style={{ width: "30%" }}>
      <Action
        onClick={() => {
          navigate("/admin/profile/" + id);
        }}
        icon={EditPenIcon}
        color="var(--color-text)"
        colorHover="var(--color-secondary)"
      >
        Editar perfil
      </Action>
      <LineElement style={{ width: "100%" }} />
      {/* {accessLevel === 2 && (
        <>
          <Action
            onClick={() => {
              handleDelete();
            }}
            icon={DeleteIcon}
            color="var(--color-error)"
            colorHover="var(--color-secondary)"
          >
            Deletar Conta
          </Action>
          <LineElement style={{ width: "100%" }} />
        </>
      )} */}

      <Action
        onClick={async () => {
          await logout();
        }}
        icon={LogoutIcon}
        color="var(--color-text)"
        colorHover="var(--color-secondary)"
      >
        Sair da Conta
      </Action>
    </div>
  );
};

const Action = ({
  children,
  onClick,
  icon: Icon,
  color,
  colorHover,
}: {
  children: React.ReactNode;
  onClick: () => void;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  colorHover: string;
}) => {
  const [logoutHover, setLogoutHover] = useState(false);

  return (
    <button
      className={profile.logout}
      onClick={onClick}
      style={{ color: logoutHover ? colorHover : color }}
      onMouseEnter={() => setLogoutHover(true)}
      onMouseLeave={() => setLogoutHover(false)}
    >
      <Icon
        className={`${profile.icon} ${logoutHover ? styles.hover : ""}`}
        style={{ fill: logoutHover ? colorHover : color }}
      />
      <span>{children}</span>
    </button>
  );
};

export default Profile;
