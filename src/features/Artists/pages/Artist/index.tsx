import Mobile from "../../../../components/ui/Mobile";
import styles from "./Artist.module.css";
import Item from "../../../../components/ui/Item";
import { ExpandIcon } from "../../../../assets";
import { useEffect, useState } from "react";
import Carousel from "../../components/ArtistsCarrousel";
import { useQuery } from "@tanstack/react-query";
import ArtistService from "../../api/ArtistService";
import { Artist as ArtistByID } from "../../types/Artist";
import { useParams } from "react-router-dom";
import { ArtWork } from "../../../ArtWorks/types/ArtWork";

const Artist = () => {
  const { id } = useParams();
  const {
    data: artistData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["artists/id", id],
    queryFn: async () => await ArtistService.getById<ArtistByID>(id || ""),
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
          src={artistData?.image.url || ""}
          alt={artistData?.name || ""}
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
          <Mobile.Title>{artistData?.name}</Mobile.Title>
          <Mobile.Share />
        </Item.Row>
        <Mobile.Subtitle>Biografia</Mobile.Subtitle>
        <Mobile.AudioPlayer
          src={artistData?.audioGuia[0].url || ""}
          type="audio/mpeg"
        />
        <Mobile.DescriptionWithLimit>
          {artistData?.biography}
        </Mobile.DescriptionWithLimit>
        {artistData && artistData?.artWorks.length > 0 && (
          <>
            <Mobile.Title2>Obras de {artistData?.name}</Mobile.Title2>
            <Carousel
              items={artistData?.artWorks as ArtWork[]}
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

export default Artist;
