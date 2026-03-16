import styles from "./Home.module.css";
import { MaucHome } from "../../assets";
import Carousel from "../../components/ui/Carousel";
import Content from "../../components/ui/Content";
import { NavLink } from "react-router-dom";
import ExpositionService from "../../features/Expositions/api/ExpositionService";
import { Exposition } from "../../features/Expositions/types/Exposition";
import { useQuery } from "@tanstack/react-query";
import Mobile from "../../components/ui/Mobile";
import { useRef } from "react";

import { useTranslation } from "../../features/Language/useTranslation";
import LanguageSelector from "../../features/Language/components/LanguageSelector";

import bgHero from "../../assets/images/bg-hero.webp";

const Home = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const nextSectionRef = useRef<HTMLDivElement | null>(null);

  const {
    data: expositions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["expositions/all"],
    queryFn: async () => await ExpositionService.getAll<Exposition>(),
  });

  if (isLoading) return <Mobile.Loading />;
  if (isError) return <Mobile.Error404 />;

  const handleStartClick = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    nextSectionRef.current?.focus();
  };

  return (
    <main className={styles.home}>
      <section
        className={styles.hero}
        ref={heroRef}
        style={{ backgroundImage: `url(${bgHero})` }}
        aria-label={t('home.hero.ariaLabel')}
      >
        <div className={styles.heroButtons}>
          <LanguageSelector />
          <button
            onClick={handleStartClick}
            className={styles.startButton}
            aria-label={t('home.hero.startButton')}
            aria-describedby="descricao-inicio"
          >
            {t('home.hero.startButton')}
          </button>
        </div>
        <p id="descricao-inicio" className="sr-only">
          {t('home.hero.description')}
        </p>
      </section>

      <Content>
        <Content.Title id="sobre-mauc">
          {t('home.sections.about.title')}
        </Content.Title>
        <Content.ImageWrapper>
          <Content.Image
            src={MaucHome}
            alt={t('home.sections.about.imageAlt')}
          />
        </Content.ImageWrapper>
        <Content.Desc color="black">
          {t('home.sections.about.description')}
        </Content.Desc>
      </Content>

      <Content>
        <Content.Title id="carousel-exposicoes-temp">
          {t('home.sections.temporaryExhibitions')}
        </Content.Title>
        <div ref={nextSectionRef} tabIndex={-1} className={styles.gap} />
        <Carousel
          link="expositions"
          num={3}
          items={expositions?.data.filter((item) => item.type == 2) || []}
          itemType="exposição"
          ariaLabelledBy="carousel-exposicoes-temp"
        />
      </Content>

      <Content>
        <Content.Title id="carousel-exposicoes-longo">
          {t('home.sections.permanentExhibitions')}
        </Content.Title>
        <Carousel
          link="expositions"
          num={3}
          items={expositions?.data.filter((item) => item.type == 1) || []}
          itemType="exposição"
          ariaLabelledBy="carousel-exposicoes-longo"
        />

        <NavLink
          to="/expositions"
          className={styles.navLink}
          aria-label={t('home.sections.seeMoreAriaLabel')}
          aria-describedby="descricao-vermais"
        >
          {t('home.sections.seeMore')}
        </NavLink>
        <p id="descricao-vermais" className="sr-only">
          {t('home.sections.seeMoreDescription')}
        </p>
      </Content>
    </main>
  );
};

export default Home;