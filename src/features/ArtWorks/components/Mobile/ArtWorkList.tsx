import { ArtWork } from "../../types/ArtWork";
import ArtWorkItem from "./ArtWorkItem";

interface ArtWorkListProps {
  artWork: ArtWork[];
}

const ArtWorkList = ({ artWork }: ArtWorkListProps) => {
  return (
    <>
      {artWork.map((item: ArtWork) => (
        <ArtWorkItem
          key={item._id}
          id={item._id}
          title={item.title}
          image={item.image.url}
          author={item.author}
          date={item.year}
          link={"/artworks/" + item._id}
          description={item.description}
        />
      ))}
    </>
  );
};

export default ArtWorkList;
