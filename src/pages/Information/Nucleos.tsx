import Mobile from "../../components/ui/Mobile";
import Item from "../../components/ui/Item";
import { MailIcon, Comunicacao, Educativo } from "../../assets";
import { useTranslation } from "../../features/Language/useTranslation";

const Nucleos = () => {
  const { t } = useTranslation();

  return (
    <section>
      <Mobile.Title style={{ paddingLeft: "20px", paddingTop: "clamp(140px, calc(5 * var(--spacing-25) + var(--spacing-15)), 150px)", marginBottom: "var(--spacing-10)" }}>
        {t('nucleos.pageTitle')}
      </Mobile.Title>

      <Mobile.ImageDefault
        src={Comunicacao}
        alt={t('nucleos.communicationLogoAlt')}
      />

      <Mobile.Title
        style={{
          paddingLeft: "20px",
          paddingTop: "var(--spacing-15)",
          color: "var(--color-text)",
        }}
      >
        {t('nucleos.communicationTitle')}
      </Mobile.Title>

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
          aria-label={t('nucleos.communicationEmailAriaLabel')}
        />
        <p
          style={{
            color: "var(--color-text-gray)",
            fontFamily: "var(--font-family-base)",
            fontWeight: "bold",
          }}
        >
          comunicamauc@ufc.br
        </p>
      </Item.Row>

      <Item.Container padding="0 20px" marginBottom="var(--spacing-25)">
        <p
          style={{
            fontSize: "var(--font-size)",
            marginTop: "var(--spacing-5)",
            color: "var(--color-text)",
            fontFamily: "var(--font-family-base)",
            lineHeight: "1.2",
          }}
        >
          {t('nucleos.communicationDescription')}
        </p>
      </Item.Container>

      <Mobile.ImageDefault
        src={Educativo}
        alt={t('nucleos.educationalImageAlt')}
      />

      <Mobile.Title
        style={{
          paddingLeft: "20px",
          paddingTop: "20px",
          color: "var(--color-text)",
        }}
      >
        {t('nucleos.educationalTitle')}
      </Mobile.Title>

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
          aria-label={t('nucleos.educationalEmailAriaLabel')}
        />
        <p
          style={{
            color: "var(--color-text-gray)",
            fontFamily: "var(--font-family-base)",
            fontWeight: "bold",
          }}
        >
          nemauc@ufc.br
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
          {t('nucleos.educationalDescription')}
        </p>
      </Item.Container>
    </section>
  );
};

export default Nucleos;