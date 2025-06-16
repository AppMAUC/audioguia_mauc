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
          <Container.Item link={"/expositions"} onClick={setModalOpen}>
            <DrawIcon className="svg1" />
            <Container.Text>Exposições</Container.Text>
          </Container.Item>
          <Container.Item link={"/artworks"} onClick={setModalOpen}>
            <PalleteIcon className="svg1" />
            <Container.Text>Obras</Container.Text>
          </Container.Item>
          <Container.Item link={"/artists"} onClick={setModalOpen}>
            <BrushIcon className="svg1" />
            <Container.Text>Artistas</Container.Text>
          </Container.Item>

          <Container.Suspense>
            <div className={styles.item}>
              <DescriptionIcon className="svg1" />
              <Container.Text>Sobre</Container.Text>
            </div>
            <>
              <NavLink to="/about" onClick={setModalOpen}>Sobre o App</NavLink>
              <NavLink to="/arquivo" onClick={setModalOpen}>Arquivo</NavLink>
              <NavLink to="/biblioteca" onClick={setModalOpen}>Biblioteca</NavLink>
              <NavLink to="/nucleos" onClick={setModalOpen}>Núcleos</NavLink>
            </>
          </Container.Suspense>

        </Container.Items>

        <div className={styles.buttons}>
          <Button>
            <NavLink to="https://forms.office.com/r/8DaNFyn2Ev">
              Agende a sua visita
            </NavLink>
          </Button>
          <Button>
            <NavLink to="https://mauc.ufc.br/pt/sobre-o-mauc/">Saiba mais</NavLink>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Menu;
