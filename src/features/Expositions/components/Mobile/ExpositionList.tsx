import { Exposition } from "../../types/Exposition";
import ExpositionItem from "./ExpositionItem";

interface ExpositionListProps {
  expositions: Exposition[];
}

const ExpositionList = ({ expositions }: ExpositionListProps) => {
  return (
    <ul role="list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {expositions.map((item: Exposition) => (
        <li key={item._id} role="listitem">
          <ExpositionItem
            key={item._id}
            id={item._id}
            title={item.title}
            image={item.image.url}
            link={"/expositions/" + item._id}
            dateStarts={item.dateStarts.split("T")[0].replace(/-/g, "/")}
            dateEnds={item.dateEnds.split("T")[0].replace(/-/g, "/")}
            description={item.description}
          />
        </li>
      ))}
    </ul>
  );
};

export default ExpositionList;
