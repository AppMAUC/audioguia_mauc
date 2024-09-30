// CSS
import styles from "./Home.module.css";
import Content from "../../components/data_display/Content";
import { NavLink } from "react-router-dom";
// Assets

import img1 from "../../assets/images/carrousel/1.png";
import img2 from "../../assets/images/carrousel/2.png";
import img3 from "../../assets/images/carrousel/3.png";
import img4 from "../../assets/images/carrousel/4.png";
import img5 from "../../assets/images/carrousel/5.png";

import CarouselC from "./Carousel";

const Home = () => {
  const images = [
    {
      id: 1,
      image: img1,
      author: "L. Da Vinci",
      dateEnds: "30/12/2021",
      title: "Ariana",
    },
    {
      id: 2,
      image: img2,
      author: "L. Da Vinci",
      dateEnds: "30/12/2021",
      title: "Ariana",
    },
    {
      id: 3,
      image: img3,
      author: "L. Da Vinci",
      dateEnds: "30/12/2021",
      title: "Ariana",
    },
    {
      id: 4,
      image: img4,
      author: "L. Da Vinci",
      dateEnds: "30/12/2021",
      title: "Ariana",
    },
    {
      id: 5,
      image: img5,
      author: "L. Da Vinci",
      dateEnds: "30/12/2021",
      title: "Ariana",
    },
  ];

  return (
    <div className={styles.home}>
      <Content>
        <Content.Title>Bem vindo(a) ao Aplicativo Mauc</Content.Title>
        <Content.Image
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.JaqqBzT0-BToIQHnW_HU9AHaCo%26pid%3DApi&f=1&ipt=0c959735749bc6b4552ed24ddb8aac0d453489f5e92cecd84d12ab8a84a70e79&ipo=images"
          alt="Museu de Arte Contemporânea"
        />
        <Content.Desc>
          O Mauc possui nove ambientes destinados às exposições de longa duração
          e três dedicados às exposições de média e curta duração (temporárias).
        </Content.Desc>
      </Content>
      <Content>
        <Content.Title>Exposições Temporárias</Content.Title>
        <CarouselC images={images} />
        <NavLink to='/artworks' className={styles.navLink}>Ver mais</NavLink>
      </Content>
      <Content>
        <Content.Title>Exposições de Longa Duração</Content.Title>
        <CarouselC images={images.slice(3)} />
        <NavLink to='/artworks' className={styles.navLink}>Ver mais</NavLink>
      </Content>
    </div>
  );
};

export default Home;
