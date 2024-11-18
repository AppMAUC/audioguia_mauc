import {
  HomeIcon,
  DescriptionIcon,
  LanguageIcon,
  HistoryIcon,
  CloseIcon,
  MailIcon,
  FeedbackIcon,
  DrawIcon,
} from "../../../assets/index.ts";

import styles from "./Menu.module.css";
import { NavLink } from "react-router-dom";
import Container from "./Menu.tsx";
import Button from "../../ui/Button/index.tsx";

interface MenuProps {
  isOpen: boolean;
  setModalOpen: () => void;
}

const Menu = ({ isOpen, setModalOpen }: MenuProps) => {
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
      >
        <Container.Nav>
          <button
            aria-label="Fechar Menu"
            className={styles.close}
            onClick={setModalOpen}
          >
            {/* <Container.Icon src={CloseIcon} alt={"Ícone de fechar"} /> */}
            <CloseIcon className="svg2"/>
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
              <NavLink to="https://mauc.ufc.br/pt/arquivo/">Arquivo</NavLink>
              <NavLink to="https://mauc.ufc.br/pt/biblioteca/">
                Biblioteca
              </NavLink>
              <NavLink to="https://mauc.ufc.br/pt/nucleo-de-comunicacao/">
                Núcleos
              </NavLink>
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
          <Container.Item link={"/history"} onClick={setModalOpen}>
            <HistoryIcon className="svg1" />
            <Container.Text>Histórico</Container.Text>
          </Container.Item>
          <Container.Item link={"/contacts"} onClick={setModalOpen}>
            <MailIcon className="svg1" />
            <Container.Text>Contatos do Mauc</Container.Text>
          </Container.Item>
          <Container.Item link={"/feedback"} onClick={setModalOpen}>
            <FeedbackIcon className="svg1" />
            <Container.Text>Reportar Problema</Container.Text>
          </Container.Item>
          <Container.Item link={"/"} onClick={setModalOpen}>
            <LanguageIcon className="svg1" />
            <Container.Text>Mudar o Idioma</Container.Text>
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
