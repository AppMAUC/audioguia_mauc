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
    nextSectionRef.current?.focus();
  };

  return (
    <main className={styles.home}>

      <section className={styles.hero} ref={heroRef} style={{ backgroundImage: `url(${bgHero})` }} aria-label="Seção inicial do Audioguia Mauc, com imagem ilustrativa da obra 'Duas Épocas' usada como capa">
        {/* <img src={maucLogo} alt="Logo do MAUC" className={styles.heroLogo} /> */}
        <button onClick={handleStartClick} className={styles.startButton} aria-label="Iniciar visita pelo museu" aria-describedby="descricao-inicio">Iniciar visita</button>
        <p id="descricao-inicio" className="sr-only">
          Ao clicar, você será levado para a próxima seção com informações sobre o museu.
        </p>
      </section>

      <Content>

        <Content.Title id="sobre-mauc">Audioguia Mauc</Content.Title>
        <Content.ImageWrapper>
          <Content.Image src={MaucHome} alt="Fachada do Museu de Arte da UFC" />
        </Content.ImageWrapper>
        <Content.Desc color="black">
          O Museu de Arte da Universidade Federal do Ceará (Mauc) possui nove ambientes para exposições de longa duração e três para temporárias.
        </Content.Desc>
      </Content>

      <Content>
        <Content.Title id="carousel-exposicoes-temp">Exposições Temporárias</Content.Title>
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
        <Content.Title id="carousel-exposicoes-longo">Exposições de Longa Duração</Content.Title>
        <Carousel
          link="expositions"
          num={3}
          items={expositions?.data.filter((item) => item.type == 1) || []}
          itemType="exposição"
          ariaLabelledBy="carousel-exposicoes-longo"
        />

        <NavLink to="/expositions" className={styles.navLink} aria-label="Ver todas as exposições" aria-describedby="descricao-vermais">
          Ver mais exposições
        </NavLink>
        <p id="descricao-vermais" className="sr-only">
          Acessa a página com todas as exposições disponíveis no museu.
        </p>
      </Content>
    </main>
  );
};

export default Home;
