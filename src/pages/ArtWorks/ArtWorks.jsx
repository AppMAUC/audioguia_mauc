import styles from "../Admin/Expositions/ExpositionDashboard.module.css";
import Card from "../../components/data_display/Cards";
import { uploads } from "../../utils/config";
import { useQuery } from "@tanstack/react-query";
import apiService from "../../services/api";

const ArtWorks = () => {
  const {
    isPending,
    error,
    data: artWorks,
  } = useQuery({
    queryKey: ["getAllArtWorks"],
    queryFn: apiService("artworks").getAll,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Obras de Arte</h2>
      </div>
      <hr className={styles.hr} />
      <div className={styles.body}>
        {artWorks.data?.length > 0 &&
          artWorks.data.map((item) => (
            <Card link={`/artworks/${item._id}`} key={item._id}>
              <Card.Image
                src={item.image.url}
                alt={item.title}
              />
              <Card.Title>{item.title}</Card.Title>
              <Card.Description>{item.partial_desc}</Card.Description>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ArtWorks;
