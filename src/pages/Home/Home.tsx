// CSS
import styles from "./Home.module.css";
// Assets
import { Image1, Image2, Image3, Image4, Image5, MaucHome } from "../../assets";
import Carousel from "../../components/ui/Carousel";
import Content from "../../components/ui/Content";
import { NavLink } from "react-router-dom";

const Home = () => {
  const images = [
    {
      id: "1",
      image: Image1,
      author: "L. Da Vinci",
      dateEnds: "30/12/2021",
      title: "Ariana",
    },
    {
      id: "2",
      image: Image2,
      author: "L. Da Vinci",
      dateEnds: "30/12/2021",
      title: "Ariana",
    },
    {
      id: "3",
      image: Image3,
      author: "L. Da Vinci",
      dateEnds: "30/12/2021",
      title: "Ariana",
    },
    {
      id: "4",
      image: Image4,
      author: "L. Da Vinci",
      dateEnds: "30/12/2021",
      title: "Ariana",
    },
    {
      id: "5",
      image: Image5,
      author: "L. Da Vinci",
      dateEnds: "30/12/2021",
      title: "Ariana",
    },
  ];

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
        <Carousel images={images} />
        <NavLink to="/expositions" className={styles.navLink}>
          Ver mais
        </NavLink>
      </Content>
      <Content>
        <Content.Title>Exposições de Longa Duração</Content.Title>
        <Carousel images={images.slice(2)} />
        <NavLink to="/expositions" className={styles.navLink}>
          Ver mais
        </NavLink>
      </Content>
    </div>
  );
};

export default Home;
