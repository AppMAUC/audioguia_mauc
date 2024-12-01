import { useRef, useState } from "react";
import {
  AccountIcon,
  CloseIcon,
  LogoutIcon,
  ProfileIcon,
} from "../../../assets";
import styles from "./Popover.module.css"; // Supondo que você tenha um arquivo CSS para os estilos
import { useAuth } from "../../../features/Admin/hooks/useAuth";
import Item from "../../ui/Item";
import { useNavigate } from "react-router-dom";

const AccountPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLButtonElement>(null);
  const [logoutHover, setLogoutHover] = useState(false);
  const { logout, currentAdmin } = useAuth();

  const handleLogout = async () => {
    await logout();
  };
  const handlePopoverOpen = () => {
    setIsOpen(true);
  };

  const handlePopoverClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        tabIndex={1}
        className={styles.menu_button}
        title="Sair"
        ref={popoverRef}
        onClick={handlePopoverOpen}
      >
        <AccountIcon className="svg2" width={40} height={40} />
      </button>
      {isOpen && (
        <div className={styles.popover}>
          <div className={styles.popover_content}>
            <CloseIcon className={styles.close} onClick={handlePopoverClose} />
            <AccountProfile
              onClick={handlePopoverClose}
              name={currentAdmin?.name || "Administrador"}
              email={currentAdmin?.email || ""}
              image={currentAdmin?.image?.url}
            />
            <button
              className={styles.logout}
              onClick={handleLogout}
              onMouseEnter={() => setLogoutHover(true)}
              onMouseLeave={() => setLogoutHover(false)}
            >
              <LogoutIcon
                className={`${styles.icon} ${logoutHover ? styles.hover : ""}`}
              />
              <span>Sair da conta</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const AccountProfile = ({
  onClick,
  email,
  name,
  image,
}: {
  onClick: () => void;
  name: string;
  email: string;
  image?: string;
}) => {
  const navigate = useNavigate();
  return (
    <Item.Container
      display="flex"
      flexDirection="row"
      padding="var(--spacing-10)"
      align="center"
      gap="var(--spacing-15)"
      borderBottom={`1px solid var(--color-state)`}
    >
      {image ? (
        <img
          src={image}
          alt="Imagem de perfil"
          className={styles.profile_image}
        />
      ) : (
        <ProfileIcon
          style={{
            fill: "var(--color-state)",
            width: "100px",
            height: "100px",
          }}
        />
      )}
      <Item.Column align="baseline" gap="var(--spacing-5)">
        <h3 className={styles.h3}>{name}</h3>
        <p className={styles.p}>{email}</p>
        <button
          onClick={() => {
            onClick();
            navigate("/admin/profile");
          }}
          className={styles.profile_button}
        >
          Ver perfil
        </button>
      </Item.Column>
    </Item.Container>
  );
};

export default AccountPopover;
