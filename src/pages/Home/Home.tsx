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

const Home = () => {
  const {
    data: expositions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["expositions/all"],
    queryFn: async () => await ExpositionService.getAll<Exposition>(),
  });

  if (isLoading) return <Mobile.Loading />;

  if (isError) return <Mobile.Error404/>;

  return (
    <div className={styles.home}>
      <Content>
        <Content.Title>Bem vindo(a) ao Aplicativo Mauc</Content.Title>
        <Content.Image src={MaucHome} alt="Museu de Arte Contemporânea" />
        <Content.Desc color="black">
          O Mauc possui nove ambientes destinados às exposições de longa duração
          e três dedicados às exposições de média e curta duração (temporárias).
        </Content.Desc>
      </Content>
      <Content>
        <Content.Title>Exposições Temporárias</Content.Title>
        <Carousel
          link="expositions"
          items={expositions?.data.filter((item) => item.type == 2) || []}
        />
      </Content>
      <Content>
        <Content.Title>Exposições de Longa Duração</Content.Title>
        <Carousel
          link="expositions"
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
