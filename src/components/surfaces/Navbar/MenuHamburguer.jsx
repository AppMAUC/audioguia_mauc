import {
  home,
  description,
  language,
  history,
  mail,
  feedback,
  close,
  drawCollage,
} from "../../../assets/Icons/icons.jsx";
import styles from "../../data_display/Menu/Menu.module.css";
import { NavLink } from "react-router-dom";
import Menu from "../../data_display/Menu/index.jsx";
import Button from "../../data_display/Button/index.jsx";

const MenuHamburguer = ({ isOpen, setModalOpen }) => {
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
        <Menu.Nav>
          <button className={styles.close} onClick={setModalOpen}>
            <Menu.Icon src={close} alt={"Ícone de fechar"} />
          </button>
        </Menu.Nav>
        <Menu.Items>
          <Menu.Item link={"/"} onClick={setModalOpen}>
            <Menu.Icon src={home} alt="Ícone de casa" />
            <Menu.Text>Home</Menu.Text>
          </Menu.Item>
          <Menu.Suspense>
            <Menu.Item
              link={"https://mauc.ufc.br/pt/sobre-o-mauc/"}
              onClick={setModalOpen}
            >
              <Menu.Icon src={description} alt="Ícone de Papel" />
              <Menu.Text>Sobre o Mauc</Menu.Text>
            </Menu.Item>
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
          </Menu.Suspense>
          <Menu.Item link={"/about"} onClick={setModalOpen}>
            <Menu.Icon src={description} alt="Ícone de Papel" />
            <Menu.Text>Sobre o App</Menu.Text>
          </Menu.Item>
          <Menu.Item link={"/expositions"} onClick={setModalOpen}>
            <Menu.Icon src={drawCollage} alt="Ícone de Colagens desenhadas" />
            <Menu.Text>Exposições</Menu.Text>
          </Menu.Item>
          <Menu.Item link={"/history"} onClick={setModalOpen}>
            <Menu.Icon src={history} alt="Ícone de relógio anti-horário" />
            <Menu.Text>Histórico</Menu.Text>
          </Menu.Item>
          <Menu.Item link={"/contacts"} onClick={setModalOpen}>
            <Menu.Icon src={mail} alt="Ícone de Carta" />
            <Menu.Text>Contatos do Mauc</Menu.Text>
          </Menu.Item>
          <Menu.Item link={"/feedback"} onClick={setModalOpen}>
            <Menu.Icon
              style={{ marginTop: ".5em" }}
              src={feedback}
              alt="Ícone de Balão com exclamação"
            />
            <Menu.Text>Reportar Problema</Menu.Text>
          </Menu.Item>
          <Menu.Item link={"/"} onClick={setModalOpen}>
            <Menu.Icon src={language} alt="Ícone de globo" />
            <Menu.Text>Mudar o Idioma</Menu.Text>
          </Menu.Item>
        </Menu.Items>
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

export default MenuHamburguer;
