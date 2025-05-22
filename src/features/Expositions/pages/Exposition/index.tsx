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
          marginTop: "140px",
        }}
        className={styles.image_container}
        onClick={() => setOpenImage((prev) => !prev)}
      >
        <Mobile.Image
          isOpen={openImage}
          src={expositionData?.image.url || ""}
          alt={expositionData?.title || ""}
        />
        <button title="Expandir Imagem" className={styles.image_button}>
          <ExpandIcon
            className={styles.expand}
            onClick={() => setOpenImage((prev) => !prev)}
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
        >
          {expositionData?.dateStarts.split("T")[0].replace(/-/g, "/")} -{" "}
          {expositionData?.dateEnds.split("T")[0].replace(/-/g, "/")}
        </p>
        <Item.Container
          display="flex"
          flexDirection="column"
          gap="var(--spacing-10)"
          marginBottom="var(--spacing-25-sm)"
        ></Item.Container>
        <Mobile.DescriptionWithLimit>
          {expositionData?.description}
        </Mobile.DescriptionWithLimit>
      </Mobile.Container>
      <Item.Row width="100%" height="100px"></Item.Row>
      <div style={{ position: "absolute", top: "90%" }}>
        {expositionData && expositionData?.artWorks?.length > 0 && (
          <ArtWorkList artWork={expositionData?.artWorks as ArtWork[]} />
        )}
      </div>
    </section>
  );
};

export default Exposition;
