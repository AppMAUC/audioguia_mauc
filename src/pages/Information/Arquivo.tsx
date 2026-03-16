import Mobile from "../../components/ui/Mobile";
import Item from "../../components/ui/Item";
import { CallIcon, MailIcon } from "../../assets";
import { Arquivo as Image } from "../../assets";
import { useTranslation } from "../../features/Language/useTranslation";

const Arquivo = () => {
  const { t } = useTranslation();

  return (
    <section>
      <Mobile.Title style={{ paddingLeft: "20px", paddingTop: "clamp(8.75rem, calc(5 * var(--spacing-25) + var(--spacing-15)), 9.375rem)", paddingBottom: "var(--spacing-10)" }}>
        {t('arquivo.pageTitle')}
      </Mobile.Title>

      <Mobile.ImageDefault
        src={Image}
        alt={t('arquivo.imageAlt')}
      />

      <Mobile.Title
        style={{
          paddingLeft: "20px",
          paddingTop: "var(--spacing-25)",
          color: "var(--color-text)",
        }}
      >
        {t('arquivo.institutionalArchive')}
      </Mobile.Title>

      <Item.Row
        justify="start"
        align="center"
        gap="var(--spacing-5)"
        marginTop="var(--spacing-10)"
      >
        <CallIcon
          style={{
            fill: "var(--color-primary)",
            width: "auto",
            paddingLeft: "20px",
            paddingRight: "10px",
          }}
          aria-label={t('arquivo.phoneAriaLabel')}
        />
        <p
          style={{
            color: "var(--color-text-gray)",
            fontFamily: "var(--font-family-base)",
            fontWeight: "bold",
          }}
        >
          +55 85 3366 7480
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
          aria-label={t('arquivo.emailAriaLabel')}
        />
        <p
          style={{
            color: "var(--color-text-gray)",
            fontFamily: "var(--font-family-base)",
            fontWeight: "bold",
          }}
        >
          arquivomauc@ufc.br
        </p>
      </Item.Row>

      <Item.Container padding="0 20px" marginBottom="clamp(35px, calc(var(--spacing-25) + var(--spacing-10)), 40px)">
        <p
          style={{
            fontSize: "var(--font-size)",
            marginTop: "var(--spacing-5)",
            color: "var(--color-text)",
            fontFamily: "var(--font-family-base)",
            lineHeight: "1.2",
          }}
        >
          {t('arquivo.institutionalDescription')}
        </p>
      </Item.Container>

      <Mobile.Title
        style={{
          paddingLeft: "20px",
          paddingTop: "var(--spacing-25)",
          color: "var(--color-text)",
        }}
      >
        {t('arquivo.historicalArchive')}
      </Mobile.Title>

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
          {t('arquivo.historicalDescription')}
        </p>
      </Item.Container>
    </section>
  );
};

export default Arquivo;