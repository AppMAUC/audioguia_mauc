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
import { useTranslation } from "../../../../features/Language/useTranslation";
import { useLanguage } from "../../../../features/Language/useLanguage";

const Exposition = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { id } = useParams();

  const getText = (ptText?: string, enText?: string) => {
    if (language === 'en' && enText) return enText;
    return ptText;
  };

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

  const formatDate = (dateString: string) => {
    return dateString.split("T")[0].replace(/-/g, "/");
  };

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
          alt={expositionData?.title
            ? t('expositions.imageAlt', { title: expositionData.title })
            : t('expositions.imageAltDefault')
          }
          onClose={() => setOpenImage(false)}
        />

        <button
          title={openImage
            ? t('expositions.expandButtonTitleOpen')
            : t('expositions.expandButtonTitleClose')
          }
          className={styles.image_button}
          onClick={() => setOpenImage((prev) => !prev)}
          aria-hidden="true"
        >
          <ExpandIcon className={styles.expand} />
        </button>
      </div>

      <Mobile.Container>
        <Item.Row align="center" justify="space-between">
          <Mobile.Title> {getText(expositionData?.title, expositionData?.title_en)} </Mobile.Title>
          <Mobile.Share />
        </Item.Row>

        <p
          style={{
            marginTop: "var(--spacing-5)",
            color: "var(--color-state)",
            fontFamily: "var(--font-family-base)",
            fontWeight: "bold",
          }}
          aria-label={t('expositions.periodAriaLabel', {
            start: expositionData ? formatDate(expositionData.dateStarts) : '',
            end: expositionData ? formatDate(expositionData.dateEnds) : ''
          })}
        >
          {expositionData && (
            <>
              {formatDate(expositionData.dateStarts)} - {formatDate(expositionData.dateEnds)}
            </>
          )}
        </p>

        <Item.Container
          display="flex"
          flexDirection="column"
          gap="var(--spacing-10)"
          marginBottom="var(--spacing-25)"
        />

        <Mobile.DescriptionWithLimit>
          {getText(expositionData?.description, expositionData?.description_en)}
        </Mobile.DescriptionWithLimit>
      </Mobile.Container>

      <Item.Row width="100%" height="100px" />

      <div
        style={{ position: "absolute", top: "90%" }}
        role="region"
        aria-label={t('expositions.artworksRegionAriaLabel')}
      >
        {expositionData && expositionData?.artWorks?.length > 0 && (
          <ArtWorkList artWork={expositionData?.artWorks as ArtWork[]} />
        )}
      </div>
    </section>
  );
};

export default Exposition;