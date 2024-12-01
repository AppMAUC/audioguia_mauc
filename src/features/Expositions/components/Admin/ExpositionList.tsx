import { Exposition } from "../../types/Exposition";
import ExpositionItem from "./ExpositionItem";

interface ExpositionListProps {
  data: Exposition[];
  type: 1 | 2;
}

const ExpositionList = ({ data, type }: ExpositionListProps) => {
  return (
    <>
      {data.map((item: Exposition) => {
        if (item.type === type) {
          return (
            <ExpositionItem
              key={item._id}
              id={item._id}
              image={item.image.url}
              title={item.title}
              startDate={item.dateStarts.split("T")[0].replace(/-/g, "/")}
              endDate={item.dateEnds.split("T")[0].replace(/-/g, "/")}
              place={item.place}
              description={item.description}
              type={2}
            />
          );
        }
      })}
    </>
  );
};

export default ExpositionList;
