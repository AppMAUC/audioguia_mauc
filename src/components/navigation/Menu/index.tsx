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
import { useTranslation } from "../../../features/Language/useTranslation";

interface MenuProps {
  isOpen: boolean;
  tabIndex?: number;
  setModalOpen: () => void;
  id?: string;
}

const Menu = ({ isOpen, setModalOpen, tabIndex, id }: MenuProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div
        onClick={setModalOpen}
        className={
          isOpen ? styles.container : `${styles.container} ${styles.hide}`
        }
      ></div>

      <div
        className={`${styles.body} ${isOpen ? styles.open : styles.hide}`}
        tabIndex={tabIndex}
        id={id}
        role="menu"
      >
        <Container.Nav>
          <button
            aria-label={t('menu.closeButtonAriaLabel')}
            className={styles.close}
            onClick={setModalOpen}
          >
            <CloseIcon className="svg2" style={{ fill: "var(--color-primary)" }} />
          </button>
        </Container.Nav>

        <Container.Items>
          <Container.Item
            link={"/"}
            onClick={setModalOpen}
            aria-label={t('menu.homeAriaLabel')}
          >
            <HomeIcon className="svg1" />
            <Container.Text>{t('menu.home')}</Container.Text>
          </Container.Item>

          <Container.Item
            link={"/expositions"}
            onClick={setModalOpen}
            aria-label={t('menu.exhibitionsAriaLabel')}
          >
            <DrawIcon className="svg1" />
            <Container.Text>{t('menu.exhibitions')}</Container.Text>
          </Container.Item>

          <Container.Item
            link={"/artworks"}
            onClick={setModalOpen}
            aria-label={t('menu.artworksAriaLabel')}
          >
            <PalleteIcon className="svg1" />
            <Container.Text>{t('menu.artworks')}</Container.Text>
          </Container.Item>

          <Container.Item
            link={"/artists"}
            onClick={setModalOpen}
            aria-label={t('menu.artistsAriaLabel')}
          >
            <BrushIcon className="svg1" />
            <Container.Text>{t('menu.artists')}</Container.Text>
          </Container.Item>

          <Container.Suspense>
            <div className={styles.item}>
              <DescriptionIcon className="svg1" />
              <Container.Text>{t('menu.about')}</Container.Text>
            </div>
            <>
              <NavLink
                to="/about"
                onClick={setModalOpen}
                aria-label={t('menu.aboutAppAriaLabel')}
              >
                {t('menu.aboutApp')}
              </NavLink>

              <NavLink
                to="/arquivo"
                onClick={setModalOpen}
                aria-label={t('menu.archiveAriaLabel')}
              >
                {t('menu.archive')}
              </NavLink>

              <NavLink
                to="/biblioteca"
                onClick={setModalOpen}
                aria-label={t('menu.libraryAriaLabel')}
              >
                {t('menu.library')}
              </NavLink>

              <NavLink
                to="/nucleos"
                onClick={setModalOpen}
                aria-label={t('menu.nucleusAriaLabel')}
              >
                {t('menu.nucleus')}
              </NavLink>
            </>
          </Container.Suspense>

        </Container.Items>

        <div className={styles.buttons}>
          <Button>
            <NavLink
              to="https://forms.office.com/r/8DaNFyn2Ev"
              aria-label={t('menu.scheduleVisitAriaLabel')}
            >
              {t('menu.scheduleVisit')}
            </NavLink>
          </Button>
          <Button>
            <NavLink
              to="https://mauc.ufc.br/pt/sobre-o-mauc/"
              aria-label={t('menu.learnMoreAriaLabel')}
            >
              {t('menu.learnMore')}
            </NavLink>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Menu;