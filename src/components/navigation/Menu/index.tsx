import {
  HomeIcon,
  DescriptionIcon,
  CloseIcon,
  DrawIcon,
  BrushIcon,
  PalleteIcon,
} from "../../../assets/index.ts";

import styles from "./Menu.module.css";
import { NavLink } from "react-router-dom";
import Container from "./Menu.tsx";
import Button from "../../ui/Button/index.tsx";

interface MenuProps {
  isOpen: boolean;
  tabIndex?: number;
  setModalOpen: () => void;
}

const Menu = ({ isOpen, setModalOpen, tabIndex }: MenuProps) => {
  return (
    <>
      <div
        onClick={setModalOpen}
        className={
          isOpen ? styles.container : `${styles.container} ${styles.hide}`
        }
      ></div>
      <div
        className={isOpen ? `${styles.body}` : `${styles.body} ${styles.hide}`}
        tabIndex={tabIndex}
      >
        <Container.Nav>
          <button
            aria-label="Fechar Menu"
            className={styles.close}
            onClick={setModalOpen}
          >
            {/* <Container.Icon src={CloseIcon} alt={"Ícone de fechar"} /> */}
            <CloseIcon className="svg2" />
          </button>
        </Container.Nav>
        <Container.Items>
          <Container.Item link={"/"} onClick={setModalOpen}>
            <HomeIcon className="svg1" />
            <Container.Text>Home</Container.Text>
          </Container.Item>
          <Container.Suspense>
            <Container.Item
              link={"https://mauc.ufc.br/pt/sobre-o-mauc/"}
              onClick={setModalOpen}
            >
              <DescriptionIcon className="svg1" />
              <Container.Text>Sobre o Mauc</Container.Text>
            </Container.Item>
            <>
              <NavLink to="/arquivo">Arquivo</NavLink>
              <NavLink to="/biblioteca">Biblioteca</NavLink>
              <NavLink to="/nucleos">Núcleos</NavLink>
              <NavLink to="https://mauc.ufc.br/pt/ferias-no-mauc-cursos-e-oficinas/">
                Cursos e oficinas
              </NavLink>
            </>
          </Container.Suspense>
          <Container.Item link={"/about"} onClick={setModalOpen}>
            <DescriptionIcon className="svg1" />
            <Container.Text>Sobre o App</Container.Text>
          </Container.Item>
          <Container.Item link={"/expositions"} onClick={setModalOpen}>
            <DrawIcon className="svg1" />
            <Container.Text>Exposições</Container.Text>
          </Container.Item>
          <Container.Item link={"/artworks"} onClick={setModalOpen}>
            <PalleteIcon className="svg1" />
            <Container.Text>Obras de Arte</Container.Text>
          </Container.Item>
          <Container.Item link={"/artists"} onClick={setModalOpen}>
            <BrushIcon className="svg1" />
            <Container.Text>Artistas</Container.Text>
          </Container.Item>
        </Container.Items>
        <div className={styles.buttons}>
          <Button>
            <NavLink to="https://forms.office.com/r/8DaNFyn2Ev">
              Agende sua Visita
            </NavLink>
          </Button>
          <Button>
            <NavLink to="https://mauc.ufc.br/pt/">Saiba mais</NavLink>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Menu;
