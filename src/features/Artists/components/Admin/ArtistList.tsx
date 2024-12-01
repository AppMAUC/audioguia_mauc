import { Artist } from "../../types/Artist";
import ArtistItem from "./ArtistItem";

interface ArtistListProps {
  data: Artist[];
}

const ArtistList = ({ data }: ArtistListProps) => {
  return (
    <>
      {data.map((item: Artist) => (
        <ArtistItem
          key={item._id}
          id={item._id}
          image={item.image.url}
          name={item.name}
          description={item.biography}
        />
      ))}
    </>
  );
};

export default ArtistList;
