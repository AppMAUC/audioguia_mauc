import { ButtonHTMLAttributes, useRef, useState } from "react";
import styles from "./Delete.module.css";
import { DeleteIcon } from "../../../../assets";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
import { createPortal } from "react-dom";
import Message from "../../Feedback/Message";
import {
  ApiError,
  ServerCreateResponse,
} from "../../../../services/api/apiService";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import Item from "../../Item";

const Delete = ({ style, ...props }: ButtonProps) => {
  const [hover, setHover] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonRef}
        className={styles.delete}
        style={style}
        {...props}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <DeleteIcon
          className={`${styles.delete_icon} ${hover ? styles.hover : ""}`}
        />
        Deletar
      </button>
    </>
  );
};

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation = ({
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) => {
  return createPortal(
    <div className={styles.confirmationOverlay}>
      <div className={styles.confirmationBox}>
        <p className={styles.p}>
          Você tem certeza
          <br />
          que gostaria de deletar?
        </p>
        <Item.Row justify="space-around" width="100%">
          <button className={styles.button} onClick={onConfirm}>
            Sim
          </button>
          <button className={styles.button} onClick={onCancel}>
            Não
          </button>
        </Item.Row>
      </div>
    </div>,
    document.body
  );
};

interface DeleteWithConfirmationProps extends ButtonProps {
  id: string;
  onDelete: (
    id: string
  ) => Promise<AxiosError | ApiError | ServerCreateResponse>;
  link?: string;
}

const DeleteWithConfirmation = ({
  id,
  onDelete,
  link,
  ...props
}: DeleteWithConfirmationProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [message, setMessage] = useState<
    ServerCreateResponse | ApiError | null
  >(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    const res = onDelete(id);
    if ((res as unknown as ApiError).statusCode) {
      setMessage(res as unknown as ApiError);
    } else {
      setMessage(res as unknown as ServerCreateResponse);
    }
    setFeedback("Deletando...");
    setTimeout(() => {
      navigate(`/${link}`);
    }, 3000);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Delete {...props} onClick={handleDeleteClick} />
      {showConfirmation && (
        <DeleteConfirmation onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
      {message && (
        <Message
          msg={message.message}
          type={"error" in message ? "error" : "success"}
        />
      )}
      <Item.Row justify="center" width="100%">
        {feedback && <Message msg={feedback} type={"warning"} />}
      </Item.Row>
    </>
  );
};

export default DeleteWithConfirmation;
