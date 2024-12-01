import Mobile from "../../../../components/ui/Mobile";
import styles from "./Preview.module.css";
import Item from "../../../../components/ui/Item";
import Placeholder from "../../../../assets/images/image-placeholder.png";
import {
  AudioPreview,
  ImagePreview,
} from "../../../../components/ui/Inputs/Upload/Preview";

interface ArtWorkPreviewProps {
  image: any;
  title: string;
  audioGuia: any;
  audioDesc: any;
  description: string;
}

const ArtWorkPreview = ({
  image,
  title,
  audioGuia,
  description,
  audioDesc,
}: ArtWorkPreviewProps) => {
  const exampleDescription =
    "Este é um exemplo de descrição de uma obra de arte. Aqui você pode adicionar informações sobre a peça, como o contexto de sua criação, os materiais utilizados e o significado por trás dela.";
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
          <Mobile.Title>{title ? title : "Nome da Obra"}</Mobile.Title>
        </Item.Row>
        <Mobile.Title
          style={{
            color: "var(--color-placeholder)",
            fontSize: "var(--h3-size)",
            marginTop: "var(--spacing-10)",
          }}
        >
          Ouvir audiodescrição
        </Mobile.Title>
        <AudioPreview file={audioDesc} />{" "}
        <Mobile.Title
          style={{
            color: "var(--color-placeholder)",
            fontSize: "var(--h3-size)",
            marginTop: "var(--spacing-10)",
          }}
        >
          Sobre a Obra{" "}
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
          {description ? description : exampleDescription}{" "}
        </p>
        <Item.Row width="100%" height="100px"></Item.Row>
      </Item.Container>
    </section>
  );
};

export default ArtWorkPreview;
