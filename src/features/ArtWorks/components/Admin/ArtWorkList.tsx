import { ArtWork } from "../../types/ArtWork";
import ArtWorkItem from "./ArtWorkItem";

interface ArtWorkListProps {
  data: ArtWork[];
}

const ArtWorkList = ({ data }: ArtWorkListProps) => {
  return (
    <>
      {data.map((item: ArtWork) => (
        <ArtWorkItem
          key={item._id}
          id={item._id}
          image={item.image.url}
          title={item.title}
          author={item.author}
          year={item.year}
          description={item.description}
        />
      ))}
    </>
  );
};

export default ArtWorkList;
