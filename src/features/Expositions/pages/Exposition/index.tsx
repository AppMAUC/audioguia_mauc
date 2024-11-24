import { useParams } from "react-router-dom";

const Exposition = () => {
  const { id } = useParams();

  return <div>Exposition {id}</div>;
};

export default Exposition;
