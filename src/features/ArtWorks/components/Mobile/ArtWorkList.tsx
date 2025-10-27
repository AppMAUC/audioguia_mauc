import { ArtWork } from "../../types/ArtWork";
import ArtWorkItem from "./ArtWorkItem";

interface ArtWorkListProps {
  artWork: ArtWork[];
}

const ArtWorkList = ({ artWork }: ArtWorkListProps) => {
  return (
    <ul
      role="list"
      aria-label="Lista de obras"
      style={{ listStyle: "none", padding: 0, margin: 0 }}
    >

      {artWork.map((item: ArtWork) => (
        <li key={item._id} role="listitem">
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
        </li>
      ))}
    </ul>
  );
};

export default ArtWorkList;
