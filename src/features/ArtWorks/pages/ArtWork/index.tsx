import Mobile from "../../../../components/ui/Mobile";
import styles from "../../../Artists/pages/Artist/Artist.module.css";
import Item from "../../../../components/ui/Item";
import { ExpandIcon } from "../../../../assets";
import { useEffect, useState } from "react";
import Carousel from "../../../Artists/components/ArtistsCarrousel";
import { useQuery } from "@tanstack/react-query";
import ArtWorkService from "../../api/ArtWorkService";
import { ArtWork as ArtWorkByID } from "../../types/ArtWork";
import { useParams } from "react-router-dom";

const ArtWork = () => {
  const { id } = useParams();
  const {
    data: artWorkData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["artWorks/id", id],
    queryFn: async () => await ArtWorkService.getById<ArtWorkByID>(id || ""),
  });

  const { data: artWorks } = useQuery({
    queryKey: ["artWorks/all"],
    queryFn: async () => await ArtWorkService.getAll<ArtWorkByID>(),
  });

  const [openImage, setOpenImage] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Mobile.Loading />;
  }

  if (isError) {
    return <Mobile.Error404 />;
  }

  return (
    <section className={styles.section}>
      <div
        className={styles.image_container}
        onClick={() => setOpenImage((prev) => !prev)}
      >
        <Mobile.Image
          isOpen={openImage}
          src={artWorkData?.image.url || ""}
          alt={artWorkData?.title || ""}
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
          <Mobile.Title>{artWorkData?.title}</Mobile.Title>
          <Mobile.Share />
        </Item.Row>
        <Item.Container
          display="flex"
          flexDirection="column"
          gap="var(--spacing-10)"
          marginBottom="var(--spacing-25)"
        >
          <Mobile.Subtitle>Autor</Mobile.Subtitle>
          <Mobile.AuthorTitle>{artWorkData?.author}</Mobile.AuthorTitle>
        </Item.Container>
        <Mobile.Subtitle>Ouvir audiodescrição</Mobile.Subtitle>
        <Mobile.AudioPlayer
          src={artWorkData?.audioDesc[0].url || ""}
          type="audio/mpeg"
        />
        <Item.Container marginTop="var(--spacing-25)">
          <Mobile.Subtitle>Ouvir sobre a obra</Mobile.Subtitle>
          <Mobile.AudioPlayer
            src={artWorkData?.audioGuia[0].url || ""}
            type="audio/mpeg"
          />
        </Item.Container>
        <Mobile.DescriptionWithLimit>
          {artWorkData?.description}
        </Mobile.DescriptionWithLimit>
        {artWorks?.data && artWorks.data.length > 0 && (
          <>
            <Mobile.Title2>Outras Obras</Mobile.Title2>
            <Carousel
              items={artWorks?.data
                .filter((artWork) => artWork._id !== id)
                .slice(0, 5)}
              link="artworks"
              style={{ borderRadius: "var(--border-radius)" }}
            />
          </>
        )}
        <Item.Row width="100%" height="100px"></Item.Row>
      </Mobile.Container>
    </section>
  );
};

export default ArtWork;
