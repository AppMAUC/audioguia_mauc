import { Artist } from "../../types/Artist";
import ArtistItem from "./ArtistItem";
import { useTranslation } from "../../../../features/Language/useTranslation";

interface ArtistListProps {
  artists: Artist[];
}

const ArtistList = ({ artists }: ArtistListProps) => {
  const { t } = useTranslation();

  return (
    <ul
      role="list"
      aria-label={t('artists.listAriaLabel')}
      style={{ listStyle: "none", padding: 0, margin: 0 }}
    >
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