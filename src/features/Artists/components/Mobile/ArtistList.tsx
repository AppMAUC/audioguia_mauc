import { Artist } from "../../types/Artist";
import ArtistItem from "./ArtistItem";

interface ArtistListProps {
  artists: Artist[];
}

const ArtistList = ({ artists }: ArtistListProps) => {
  return (
    <>
      {artists.map((item: Artist) => (
        <ArtistItem
          key={item._id}
          id={item._id}
          name={item.name}
          image={item.image.url}
          date={item.birthDate.split("-")[0]}
          link={"/Artists/" + item._id}
          biography={item.biography}
        />
      ))}
    </>
  );
};

export default ArtistList;
