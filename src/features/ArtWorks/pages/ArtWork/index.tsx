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
import ArtistService from "../../../Artists/api/ArtistService";
import { Artist as ArtistByID } from "../../../Artists/types/Artist";
import { NavLink } from "react-router-dom";
import { useTranslation } from "../../../../features/Language/useTranslation";
import { useLanguage } from "../../../../features/Language/useLanguage";

const ArtWork = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { id } = useParams();

  const getText = (ptText?: string, enText?: string) => {
    if (language === 'en' && enText) return enText;
    return ptText;
  };

  const {
    data: artWorkData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["artWorks/id", id],
    queryFn: async () => await ArtWorkService.getById<ArtWorkByID>(id || ""),
  });

  const { data: artists } = useQuery({
    queryKey: ["artists/all"],
    queryFn: async () => await ArtistService.getAll<ArtistByID>(),
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
        style={{
          marginTop: "clamp(8.75rem, calc(5 * var(--spacing-25) + var(--spacing-15)), 9.375rem)",
        }}
        className={styles.image_container}
      >
        <Mobile.Image
          isOpen={openImage}
          src={artWorkData?.image.url || ""}
          alt={
            artWorkData?.title
              ? t('artworks.imageAlt', { title: artWorkData.title })
              : t('artworks.imageAltDefault')
          }
          onClose={() => setOpenImage(false)}
        />

        <button
          title={openImage ? t('artworks.expandButtonTitleOpen') : t('artworks.expandButtonTitleClose')}
          className={styles.image_button}
          onClick={() => setOpenImage((prev) => !prev)}
          aria-hidden="true"
        >
          <ExpandIcon className={styles.expand} />
        </button>
      </div>

      <Mobile.Container>
        <Item.Row align="center" justify="space-between">
          <Mobile.Title>{getText(artWorkData?.title, artWorkData?.title_en)}</Mobile.Title>
          <Mobile.Share />
        </Item.Row>

        <Item.Container
          display="flex"
          flexDirection="column"
          gap="var(--spacing-10)"
          marginBottom="var(--spacing-15)"
        >
          <Mobile.Subtitle>{t('artworks.author')}</Mobile.Subtitle>

          {(() => {
            const matchingArtist = artists?.data.find(
              (artist) => artist.name.toLowerCase() === artWorkData?.author.toLowerCase()
            );

            return matchingArtist ? (
              <NavLink to={`/artists/${matchingArtist._id}`} className="text-blue-600 hover:underline">
                <Mobile.AuthorTitle>{artWorkData?.author}</Mobile.AuthorTitle>
              </NavLink>
            ) : (
              <Mobile.AuthorTitle>{artWorkData?.author}</Mobile.AuthorTitle>
            );
          })()}
        </Item.Container>

        <Item.Container marginTop="var(--spacing-15)">
          <Mobile.Subtitle>{t('artworks.audioDescription')}</Mobile.Subtitle>
          <Mobile.AudioPlayer
            src={artWorkData?.audioDesc[0].url || ""}
            type="audio/mpeg"
            ariaLabelPrefix={t('artworks.audioDescriptionAriaLabel')}
          />
        </Item.Container>

        <Item.Container marginTop="var(--spacing-15)">
          <Mobile.Subtitle>{t('artworks.aboutPt')}</Mobile.Subtitle>
          <Mobile.AudioPlayer
            src={artWorkData?.audioGuia[0].url || ""}
            type="audio/mpeg"
            ariaLabelPrefix={t('artworks.aboutPtAriaLabel')}
          />
        </Item.Container>

        <Item.Container marginTop="var(--spacing-15)">
          <Mobile.Subtitle>{t('artworks.aboutEn')}</Mobile.Subtitle>
          {artWorkData?.audioGuia?.[1]?.url ? (
            <Mobile.AudioPlayer
              src={artWorkData.audioGuia[1].url}
              type="audio/mpeg"
              ariaLabelPrefix={t('artworks.aboutEnAriaLabel')}
            />
          ) : (
            <p>{t('artworks.audioNotAvailable')}</p>
          )}
        </Item.Container>

        <Mobile.DescriptionWithLimit>
          {getText(artWorkData?.description, artWorkData?.description_en)}
        </Mobile.DescriptionWithLimit>

        {artWorks?.data && artWorks.data.length > 0 && (
          <>
            <Mobile.Title2>{t('artworks.otherArtworks')}</Mobile.Title2>
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