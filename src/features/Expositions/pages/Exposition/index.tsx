import Mobile from "../../../../components/ui/Mobile";
import styles from "../../../Artists/pages/Artist/Artist.module.css";
import Item from "../../../../components/ui/Item";
import { ExpandIcon } from "../../../../assets";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ExpositionService from "../../api/ExpositionService";
import { Exposition as ExpositionByID } from "../../types/Exposition";
import { useParams } from "react-router-dom";
import ArtWorkList from "../../../ArtWorks/components/Mobile/ArtWorkList";
import { ArtWork } from "../../../ArtWorks/types/ArtWork";

const Exposition = () => {
  const { id } = useParams();
  const {
    data: expositionData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["expositions/id", id],
    queryFn: async () =>
      await ExpositionService.getById<ExpositionByID>(id || ""),
  });

  const [openImage, setOpenImage] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <Mobile.Loading />;

  if (isError) return <Mobile.Error404 />;

  return (
    <section className={styles.section}>
      <div
        style={{
          marginTop: "clamp(8.75rem, calc(5 * var(--spacing-25) + var(--spacing-15)), 9.375rem)",
        }}
        className={styles.image_container}
      >
        <Mobile.Image
          isOpen={openImage}
          src={expositionData?.image.url || ""}
          alt={expositionData?.title ? `Imagem da exposição ${expositionData.title}` : "Imagem da exposição"}
          onClose={() => setOpenImage(false)}
        />

        <button title={openImage ? "Fechar imagem" : "Expandir imagem"} className={styles.image_button} onClick={() => setOpenImage((prev) => !prev)} aria-hidden="true">
          <ExpandIcon
            className={styles.expand}
          />
        </button>
      </div>

      <Mobile.Container>
        <Item.Row align="center" justify="space-between">
          <Mobile.Title>{expositionData?.title}</Mobile.Title>
          <Mobile.Share />
        </Item.Row>
        <p
          style={{
            marginTop: "var(--spacing-5)",
            color: "var(--color-state)",
            fontFamily: "var(--font-family-base)",
            fontWeight: "bold",
          }}
          aria-label={`Período da exposição: de ${expositionData?.dateStarts.split("T")[0].replace(/-/g, "/")} até ${expositionData?.dateEnds.split("T")[0].replace(/-/g, "/")}`}
        >
          {expositionData?.dateStarts.split("T")[0].replace(/-/g, "/")} -{" "}
          {expositionData?.dateEnds.split("T")[0].replace(/-/g, "/")}
        </p>

        <Item.Container
          display="flex"
          flexDirection="column"
          gap="var(--spacing-10)"
          marginBottom="var(--spacing-25)"
        ></Item.Container>

        <Mobile.DescriptionWithLimit>
          {expositionData?.description}
        </Mobile.DescriptionWithLimit>
      </Mobile.Container>

      <Item.Row width="100%" height="100px"></Item.Row>

      <div style={{ position: "absolute", top: "90%" }} role="region" aria-label="Obras da exposição">
        {expositionData && expositionData?.artWorks?.length > 0 && (
          <ArtWorkList artWork={expositionData?.artWorks as ArtWork[]} />
        )}
      </div>

    </section>
  );
};

export default Exposition;
