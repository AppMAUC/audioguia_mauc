import { Exposition } from "../types/Exposition";
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
              startDate={item.dateStarts}
              endDate={item.dateEnds}
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
