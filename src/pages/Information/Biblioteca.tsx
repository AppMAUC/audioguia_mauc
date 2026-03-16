import Mobile from "../../components/ui/Mobile";
import Item from "../../components/ui/Item";
import { CallIcon, MailIcon } from "../../assets";
import { Biblioteca as Image } from "../../assets";
import { useTranslation } from "../../features/Language/useTranslation";

const Biblioteca = () => {
  const { t } = useTranslation();

  return (
    <section>
      <Mobile.Title style={{ paddingLeft: "20px", paddingTop: "clamp(140px, calc(5 * var(--spacing-25) + var(--spacing-15)), 150px)", marginBottom: "var(--spacing-10)" }}>
        {t('biblioteca.pageTitle')}
      </Mobile.Title>

      <Mobile.ImageDefault
        src={Image}
        alt={t('biblioteca.imageAlt')}
      />

      <Item.Row
        justify="start"
        align="center"
        gap="var(--spacing-5)"
        marginTop="var(--spacing-25)"
      >
        <CallIcon
          style={{
            fill: "var(--color-primary)",
            width: "auto",
            paddingLeft: "20px",
            paddingRight: "10px",
          }}
          aria-label={t('biblioteca.phoneAriaLabel')}
        />
        <p
          style={{
            color: "var(--color-text-gray)",
            fontFamily: "var(--font-family-base)",
            fontWeight: "bold",
          }}
        >
          +55 85 3366 7481
        </p>
      </Item.Row>

      <Item.Row
        justify="start"
        align="center"
        gap="var(--spacing-10)"
        marginTop="var(--spacing-10)"
      >
        <MailIcon
          style={{
            fill: "var(--color-primary)",
            height: "auto",
            paddingLeft: "20px",
          }}
          aria-label={t('biblioteca.emailAriaLabel')}
        />
        <p
          style={{
            color: "var(--color-text-gray)",
            fontFamily: "var(--font-family-base)",
            fontWeight: "bold",
          }}
        >
          bibliotecamauc@ufc.br
        </p>
      </Item.Row>

      <Item.Container padding="0 20px">
        <p
          style={{
            fontSize: "var(--font-size)",
            marginTop: "var(--spacing-5)",
            color: "var(--color-text)",
            fontFamily: "var(--font-family-base)",
            lineHeight: "1.2",
          }}
        >
          {t('biblioteca.description')}
          <br />
          <br />
          {t('biblioteca.services')}
          <br />
        </p>
        <ul
          style={{
            listStyleType: "disc",
            paddingLeft: "var(--spacing-25)",
            fontSize: "var(--font-size)",
            color: "var(--color-text)",
            fontFamily: "var(--font-family-base)",
            lineHeight: "1.2",
          }}
        >
          <li>{t('biblioteca.service1')}</li>
          <li>{t('biblioteca.service2')}</li>
          <li>{t('biblioteca.service3')}</li>
        </ul>
      </Item.Container>
    </section>
  );
};

export default Biblioteca;