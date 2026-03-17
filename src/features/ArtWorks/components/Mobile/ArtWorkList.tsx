import { ArtWork } from "../../types/ArtWork";
import ArtWorkItem from "./ArtWorkItem";
import { useTranslation } from "../../../../features/Language/useTranslation";

interface ArtWorkListProps {
  artWork: ArtWork[];
}

const ArtWorkList = ({ artWork }: ArtWorkListProps) => {
  const { t } = useTranslation();

  return (
    <ul
      role="list"
      aria-label={t('artworks.listAriaLabel')}
      style={{ listStyle: "none", padding: 0, margin: 0 }}
    >
      {artWork.map((item: ArtWork) => (
        <li key={item._id} role="listitem">
          <ArtWorkItem
            key={item._id}
            id={item._id}
            title={item.title}
            title_en={item.title_en}
            image={item.image.url}
            author={item.author}
            date={item.year}
            link={"/artworks/" + item._id}
            description={item.description}
            description_en={item.description_en}
          />
        </li>
      ))}
    </ul>
  );
};

export default ArtWorkList;