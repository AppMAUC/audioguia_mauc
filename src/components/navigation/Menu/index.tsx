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
  id?: string;
}

const Menu = ({ isOpen, setModalOpen, tabIndex, id }: MenuProps) => {

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
        id={id}
        role="menu"

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

          <Container.Item link={"/"} onClick={setModalOpen} aria-label="Página inicial">
            <HomeIcon className="svg1" />
            <Container.Text>Home</Container.Text>
          </Container.Item>
          <Container.Item link={"/expositions"} onClick={setModalOpen} aria-label="Exposições">
            <DrawIcon className="svg1" />
            <Container.Text>Exposições</Container.Text>
          </Container.Item>
          <Container.Item link={"/artworks"} onClick={setModalOpen} aria-label="Obras">
            <PalleteIcon className="svg1" />
            <Container.Text>Obras</Container.Text>
          </Container.Item>
          <Container.Item link={"/artists"} onClick={setModalOpen} aria-label="Artistas">
            <BrushIcon className="svg1" />
            <Container.Text>Artistas</Container.Text>
          </Container.Item>

          <Container.Suspense>
            <div className={styles.item}>
              <DescriptionIcon className="svg1" />
              <Container.Text>Sobre</Container.Text>
            </div>
            <>
              <NavLink to="/about" onClick={setModalOpen} aria-label="Sobre o App">Sobre o App</NavLink>
              <NavLink to="/arquivo" onClick={setModalOpen} aria-label="Arquivo">Arquivo</NavLink>
              <NavLink to="/biblioteca" onClick={setModalOpen} aria-label="Biblioteca">Biblioteca</NavLink>
              <NavLink to="/nucleos" onClick={setModalOpen} aria-label="Núcleos">Núcleos</NavLink>
            </>
          </Container.Suspense>

        </Container.Items>

        <div className={styles.buttons}>
          <Button>
            <NavLink to="https://forms.office.com/r/8DaNFyn2Ev" aria-label="Agendar visita">
              Agende a sua visita
            </NavLink>
          </Button>
          <Button>
            <NavLink to="https://mauc.ufc.br/pt/sobre-o-mauc/" aria-label="Saiba mais sobre o MAUC">Saiba mais</NavLink>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Menu;
