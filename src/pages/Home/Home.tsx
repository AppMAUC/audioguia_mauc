// CSS
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

import bgHero from "../../assets/images/bg-hero.jpg";

const Home = () => {
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
  };

  return (
    <div className={styles.home}>
      <div className={styles.hero} ref={heroRef} style={{ backgroundImage: `url(${bgHero})` }}>
        {/* <img src={maucLogo} alt="Logo do MAUC" className={styles.heroLogo} /> */}
        <button onClick={handleStartClick}>Iniciar visita</button>
        <div ref={nextSectionRef} className={styles.gap} />
      </div>

      <Content>
        <Content.Title>Audioguia Mauc</Content.Title>
        <Content.ImageWrapper>
          <Content.Image src={MaucHome} alt="Museu de Arte Contemporânea" />
        </Content.ImageWrapper>
        <Content.Desc color="black">
          O Museu de Arte da Universidade Federal do Ceará (Mauc) possui nove ambientes para exposições de longa duração e três para temporárias.
        </Content.Desc>
      </Content>
      <Content>
        <Content.Title>Exposições Temporárias</Content.Title>
        <Carousel
          link="expositions"
          num={3}
          items={expositions?.data.filter((item) => item.type == 2) || []}
        />
      </Content>
      <Content>
        <Content.Title>Exposições de Longa Duração</Content.Title>
        <Carousel
          link="expositions"
          num={3}
          items={expositions?.data.filter((item) => item.type == 1) || []}
        />
        <NavLink to="/expositions" className={styles.navLink}>
          Ver mais
        </NavLink>
      </Content>
    </div>
  );
};

export default Home;
