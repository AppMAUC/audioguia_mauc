
interface Props {
  msg: string | undefined;
  type: "error" | "success" | "info" | "warning";
}

const Message = ({ msg, type }: Props) => {
  return <span className={`msg ${type}`}>{msg}</span>;
};

export default Message;
