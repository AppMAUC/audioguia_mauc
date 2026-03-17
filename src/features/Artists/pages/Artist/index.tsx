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
import { useTranslation } from "../../../../features/Language/useTranslation";
import { useLanguage } from "../../../../features/Language/useLanguage";

const Artist = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { id } = useParams();

  const getText = (ptText?: string, enText?: string) => {
    if (language === 'en' && enText) return enText;
    return ptText;
  };

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
        style={{
          marginTop: "clamp(8.75rem, calc(5 * var(--spacing-25) + var(--spacing-15)), 9.375rem)",
        }}
        className={styles.image_container}
      >
        <Mobile.Image
          isOpen={openImage}
          src={artistData?.image.url || ""}
          alt={artistData?.name
            ? t('artists.imageAlt', { name: artistData.name })
            : t('artists.imageAltDefault')
          }
          onClose={() => setOpenImage(false)}
        />
        <button
          title={openImage ? t('artists.expandButtonTitleOpen') : t('artists.expandButtonTitleClose')}
          className={styles.image_button}
          onClick={() => setOpenImage((prev) => !prev)}
          aria-hidden="true"
        >
          <ExpandIcon className={styles.expand} />
        </button>
      </div>

      <Mobile.Container>
        <Item.Row align="center" justify="space-between">
          <Mobile.Title>{artistData?.name}</Mobile.Title>
          <Mobile.Share />
        </Item.Row>

        <Mobile.Subtitle>{t('artists.biographyPt')}</Mobile.Subtitle>
        {artistData?.audioGuia?.[0]?.url ? (
          <Mobile.AudioPlayer
            src={artistData.audioGuia[0].url}
            type="audio/mpeg"
            ariaLabelPrefix={t('artists.audioAriaLabelPrefixPt', { name: artistData?.name || '' })}
          />
        ) : (
          <p>{t('artists.audioNotAvailablePt')}</p>
        )}

        <Item.Container marginTop="var(--spacing-15)">
          <Mobile.Subtitle>{t('artists.biographyEn')}</Mobile.Subtitle>
          {artistData?.audioGuia?.[1]?.url ? (
            <Mobile.AudioPlayer
              src={artistData.audioGuia[1].url}
              type="audio/mpeg"
              ariaLabelPrefix={t('artists.audioAriaLabelPrefixEn', { name: artistData?.name || '' })}
            />
          ) : (
            <p>{t('artists.audioNotAvailableEn')}</p>
          )}
        </Item.Container>

        <Mobile.DescriptionWithLimit>
          {getText(artistData?.biography, artistData?.biography_en)}
        </Mobile.DescriptionWithLimit>

        {artistData && artistData?.artWorks.length > 0 && (
          <>
            <Mobile.Title2>
              {t('artists.artworksBy', { name: artistData?.name || '' })}
            </Mobile.Title2>
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