import { Artist } from "../../types/Artist";
import ArtistItem from "./ArtistItem";

interface ArtistListProps {
  artists: Artist[];
}

const ArtistList = ({ artists }: ArtistListProps) => {
  return (
    <ul role="list" aria-label="Lista de Artistas" style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {artists.map((item: Artist) => (
        <li key={item._id} role="listitem">
          <ArtistItem
            id={item._id}
            name={item.name}
            image={item.image.url}
            date={item.birthDate.split("-")[0]}
            link={"/Artists/" + item._id}
            biography={item.biography}
          />
        </li>
      ))}
    </ul>
  );
};

export default ArtistList;
