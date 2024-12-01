import Mobile from "../../../../components/ui/Mobile";
import styles from "./Artist.module.css";
import Item from "../../../../components/ui/Item";
import Placeholder from "../../../../assets/images/image-placeholder.png";
import {
  AudioPreview,
  ImagePreview,
} from "../../../../components/ui/Inputs/Upload/Preview";

interface ArtistPreviewProps {
  image: any;
  name: string;
  audioGuia: any;
  biography: string;
}

const Artist = ({ image, name, audioGuia, biography }: ArtistPreviewProps) => {
  const exampleBiography =
    "Este é um exemplo de biografia do artista. Aqui você pode adicionar informações sobre a vida, carreira e obras do artista.";
  return (
    <section className={styles.section}>
      <Mobile.Title style={{ color: "var(--color-placeholder)" }}>
        Pré-Vizualização
      </Mobile.Title>
      <hr />
      {image && image.length != 0 ? (
        <div className={styles.image_container}>
          <ImagePreview file={image} alt="Preview" />
        </div>
      ) : (
        <Mobile.ImageDefault src={Placeholder} alt="Preview" />
      )}
      <Item.Container padding="20px">
        <Item.Row align="center" justify="space-between">
          <Mobile.Title>{name ? name : "Nome do Artista"}</Mobile.Title>
        </Item.Row>
        <Mobile.Title
          style={{
            color: "var(--color-placeholder)",
            fontSize: "var(--h3-size)",
            marginTop: "var(--spacing-10)",
          }}
        >
          Biografia
        </Mobile.Title>
        <AudioPreview file={audioGuia} />{" "}
        <p
          style={{
            width: "100%",
            height: "auto",
            fontSize: "var(--p-size)",
            marginTop: "var(--spacing-10)",
            fontFamily: "var(--font-family-base)",
            color: "var(--color-text)",
            boxSizing: "border-box",
            textWrap: "wrap",
            whiteSpace: "normal",
            overflow: "hidden",
            wordWrap: "break-word",
          }}
        >
          {" "}
          {biography ? biography : exampleBiography}{" "}
        </p>
        <Item.Row width="100%" height="100px"></Item.Row>
      </Item.Container>
    </section>
  );
};

export default Artist;
