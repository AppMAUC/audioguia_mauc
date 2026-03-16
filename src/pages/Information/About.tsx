import Mobile from "../../components/ui/Mobile";
import Item from "../../components/ui/Item";
import {
  GithubIcon,
  MailIcon,
  AppMaucLogo,
  LogosApp,
} from "../../assets";
import { Link } from "react-router-dom";
import { useTranslation } from "../../features/Language/useTranslation";

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <section>
        <Mobile.Title
          style={{
            paddingLeft: "20px",
            paddingTop: "clamp(8.75rem, calc(5 * var(--spacing-25) + var(--spacing-15)), 9.375rem)",
            textAlign: "start",
            paddingBottom: "var(--spacing-25)"
          }}
        >
          {t('about.pageTitle')}
        </Mobile.Title>

        <Item.Row
          width="100%"
          height="auto"
          justify="center"
          align="center"
          gap="var(--spacing-10)"
          marginTop="var(--spacing-10)"
        >
          <AppMaucLogo
            style={{ width: "90%", height: "auto" }}
            role="img"
            aria-label={t('about.appLogoAriaLabel')}
          />
        </Item.Row>

        <Item.Row
          justify="start"
          padding="0 20px"
          align="center"
          gap="var(--spacing-10)"
          marginTop="var(--spacing-10)"
          margin="var(--spacing-10)"
        >
          <MailIcon
            style={{
              fill: "var(--color-primary)",
              width: "24px",
              height: "24px",
            }}
            aria-label={t('about.emailAriaLabel')}
          />
          <p
            style={{
              color: "var(--color-text-gray)",
              fontFamily: "var(--font-family-base)",
              fontWeight: "bold",
            }}
          >
            appmauc@gmail.com
          </p>
        </Item.Row>

        <Item.Row
          justify="start"
          padding="0 20px"
          align="center"
          gap="var(--spacing-10)"
          marginTop="var(--spacing-10)"
          margin="var(--spacing-10)"
        >
          <Link to="https://github.com/appmauc" aria-label={t('about.githubAriaLabel')}>
            <Github user="appmauc" />
          </Link>
        </Item.Row>

        <Item.Container padding="0 20px" marginTop="calc(var(--spacing-15) + var(--spacing-5))">
          <p
            style={{
              fontSize: "var(--h2-size)",
              marginTop: "var(--spacing-5)",
              color: "var(--color-text)",
              fontFamily: "var(--font-family-base)",
              lineHeight: "1.2",
            }}
          >
            {t('about.description')}
          </p>

          <Item.Column gap="var(--spacing-10)">
            <Mobile.Title
              style={{
                color: "var(--color-text)",
                marginTop: "var(--spacing-25)",
              }}
            >
              {t('about.realization')}
            </Mobile.Title>

            <Item.Column margin="var(--spacing-10)">
              <Item.Container marginLeft={"3px"}>
                <Mobile.Subtitle>{t('about.coordinator')}</Mobile.Subtitle>
              </Item.Container>

              <p
                style={{
                  fontSize: "var(--h2-size)",
                  marginTop: "var(--spacing-10)",
                  marginBottom: "var(--spacing-5)",
                  paddingLeft: "3px",
                  color: "var(--color-text)",
                  fontWeight: "bold",
                  fontFamily: "var(--font-family-base)",
                  lineHeight: "1.2",
                }}
              >
                Kathleen Raelle de Paiva Silveira
              </p>
              <Email email="kathleen@ufc.br" />
            </Item.Column>

            <Item.Column margin="var(--spacing-10)">
              <Item.Container marginLeft={"3px"}>
                <Mobile.Subtitle>{t('about.supervision')}</Mobile.Subtitle>
              </Item.Container>

              <p
                style={{
                  fontSize: "var(--h2-size)",
                  marginTop: "var(--spacing-10)",
                  marginBottom: "var(--spacing-5)",
                  paddingLeft: "3px",
                  color: "var(--color-text)",
                  fontWeight: "bold",
                  fontFamily: "var(--font-family-base)",
                  lineHeight: "1.2",
                }}
              >
                Kathleen Raelle de Paiva Silveira
              </p>
              <Email email="kathleen@ufc.br" />

              <p
                style={{
                  fontSize: "var(--h2-size)",
                  marginTop: "var(--spacing-10)",
                  marginBottom: "var(--spacing-5)",
                  paddingLeft: "3px",
                  color: "var(--color-text)",
                  fontWeight: "bold",
                  fontFamily: "var(--font-family-base)",
                  lineHeight: "1.2",
                }}
              >
                {t('about.supervisorDetails')}
              </p>
              <Email email="alysson@virtual.ufc.br" />
            </Item.Column>

            <Item.Column margin="var(--spacing-10)">
              <Item.Container marginLeft={"3px"}>
                <Mobile.Subtitle>{t('about.developer')}</Mobile.Subtitle>
              </Item.Container>
              <p
                style={{
                  fontSize: "var(--h2-size)",
                  marginTop: "var(--spacing-10)",
                  marginBottom: "var(--spacing-5)",
                  paddingLeft: "3px",
                  color: "var(--color-text)",
                  fontWeight: "bold",
                  fontFamily: "var(--font-family-base)",
                  lineHeight: "1.2",
                }}
              >
                Victor Emanuel Tomaz das Neves
              </p>
              <Email email="victoremanuel.vetn@alu.ufc.br" />

              <p
                style={{
                  fontSize: "var(--h2-size)",
                  marginTop: "var(--spacing-10)",
                  marginBottom: "var(--spacing-5)",
                  paddingLeft: "3px",
                  color: "var(--color-text)",
                  fontWeight: "bold",
                  fontFamily: "var(--font-family-base)",
                  lineHeight: "1.2",
                }}
              >
                Mateus Marques de Aquino
              </p>
              <Email email="mateusaquinomr@gmail.com" />
            </Item.Column>

            <Item.Column margin="var(--spacing-10)">
              <Item.Container marginLeft={"3px"}>
                <Mobile.Subtitle>{t('about.designer')}</Mobile.Subtitle>
              </Item.Container>
              <p
                style={{
                  fontSize: "var(--h2-size)",
                  marginTop: "var(--spacing-10)",
                  marginBottom: "var(--spacing-5)",
                  paddingLeft: "3px",
                  color: "var(--color-text)",
                  fontWeight: "bold",
                  fontFamily: "var(--font-family-base)",
                  lineHeight: "1.2",
                }}
              >
                Angelo Vinícius Damasceno Andrade
              </p>
              <Email email="angelovinicius@alu.ufc.br" />

              <p
                style={{
                  fontSize: "var(--h2-size)",
                  marginTop: "var(--spacing-10)",
                  marginBottom: "var(--spacing-5)",
                  paddingLeft: "3px",
                  color: "var(--color-text)",
                  fontWeight: "bold",
                  fontFamily: "var(--font-family-base)",
                  lineHeight: "1.2",
                }}
              >
                Giovanna Olivati Quintana
              </p>
              <Email email="giovannaolivati@alu.ufc.br" />

              <p
                style={{
                  fontSize: "var(--h2-size)",
                  marginTop: "var(--spacing-10)",
                  marginBottom: "var(--spacing-5)",
                  paddingLeft: "3px",
                  color: "var(--color-text)",
                  fontWeight: "bold",
                  fontFamily: "var(--font-family-base)",
                  lineHeight: "1.2",
                }}
              >
                Mateus Marques de Aquino
              </p>
              <Email email="mateusaquinomr@gmail.com" />
            </Item.Column>
          </Item.Column>

          <Item.Column gap="var(--spacing-10)">
            <Mobile.Title
              style={{
                color: "var(--color-text)",
                marginTop: "var(--spacing-25)",
              }}
            >
              {t('about.partners')}
            </Mobile.Title>

            <Item.Column>
              <Item.Container marginLeft={"3px"}>
                <Mobile.Subtitle>{t('about.latavLead')}</Mobile.Subtitle>
              </Item.Container>
              <p
                style={{
                  fontSize: "var(--h2-size)",
                  marginTop: "var(--spacing-10)",
                  marginBottom: "var(--spacing-5)",
                  paddingLeft: "3px",
                  color: "var(--color-text)",
                  fontWeight: "bold",
                  fontFamily: "var(--font-family-base)",
                  lineHeight: "1.2",
                }}
              >
                Profa. Vera Lúcia Santiago Sampaio
              </p>
            </Item.Column>

            <Item.Column>
              <Item.Container marginLeft={"3px"}>
                <Mobile.Subtitle>{t('about.tactilePhotography')}</Mobile.Subtitle>
              </Item.Container>
              <p
                style={{
                  fontSize: "var(--h2-size)",
                  marginTop: "var(--spacing-10)",
                  marginBottom: "var(--spacing-5)",
                  paddingLeft: "3px",
                  color: "var(--color-text)",
                  fontWeight: "bold",
                  fontFamily: "var(--font-family-base)",
                  lineHeight: "1.2",
                }}
              >
                Prof. Roberto Vieira
              </p>
            </Item.Column>

            <Item.Column>
              <Item.Container marginLeft={"3px"}>
                <Mobile.Subtitle>{t('about.universityRadio')}</Mobile.Subtitle>
              </Item.Container>
              <p
                style={{
                  fontSize: "var(--h2-size)",
                  marginTop: "var(--spacing-10)",
                  marginBottom: "var(--spacing-5)",
                  paddingLeft: "3px",
                  color: "var(--color-text)",
                  fontWeight: "bold",
                  fontFamily: "var(--font-family-base)",
                  lineHeight: "1.2",
                }}
              >
                Thaís Amorim Aragão
              </p>
            </Item.Column>

            <Item.Column>
              <Item.Container marginLeft={"3px"}>
                <Mobile.Subtitle>{t('about.letrare')}</Mobile.Subtitle>
              </Item.Container>
              <p
                style={{
                  fontSize: "var(--h2-size)",
                  marginTop: "var(--spacing-10)",
                  marginBottom: "var(--spacing-5)",
                  paddingLeft: "3px",
                  color: "var(--color-text)",
                  fontWeight: "bold",
                  fontFamily: "var(--font-family-base)",
                  lineHeight: "1.2",
                }}
              >
                Profa. Diana Fortier
              </p>
            </Item.Column>

            <Item.Column>
              <Item.Container marginLeft={"3px"}>
                <Mobile.Subtitle>{t('about.prointer')}</Mobile.Subtitle>
              </Item.Container>
              <p
                style={{
                  fontSize: "var(--h2-size)",
                  marginTop: "var(--spacing-10)",
                  marginBottom: "var(--spacing-5)",
                  paddingLeft: "3px",
                  color: "var(--color-text)",
                  fontWeight: "bold",
                  fontFamily: "var(--font-family-base)",
                  lineHeight: "1.2",
                }}
              >
                Tadeu Azevedo
              </p>
              <p
                style={{
                  fontSize: "var(--h2-size)",
                  marginTop: "var(--spacing-10)",
                  marginBottom: "var(--spacing-5)",
                  paddingLeft: "3px",
                  color: "var(--color-text)",
                  fontWeight: "bold",
                  fontFamily: "var(--font-family-base)",
                  lineHeight: "1.2",
                }}
              >
                Ananda Badaró
              </p>
            </Item.Column>

            <Item.Column>
              <Item.Container marginLeft={"3px"}>
                <Mobile.Subtitle>{t('about.sti')}</Mobile.Subtitle>
              </Item.Container>
              <p
                style={{
                  fontSize: "var(--h2-size)",
                  marginTop: "var(--spacing-10)",
                  marginBottom: "var(--spacing-5)",
                  paddingLeft: "3px",
                  color: "var(--color-text)",
                  fontWeight: "bold",
                  fontFamily: "var(--font-family-base)",
                  lineHeight: "1.2",
                }}
              >
                Amarildo Maia Rolim
              </p>
              <p
                style={{
                  fontSize: "var(--h2-size)",
                  marginTop: "var(--spacing-10)",
                  marginBottom: "var(--spacing-5)",
                  paddingLeft: "3px",
                  color: "var(--color-text)",
                  fontWeight: "bold",
                  fontFamily: "var(--font-family-base)",
                  lineHeight: "1.2",
                }}
              >
                Woldisney Derarovele Semeão
              </p>
            </Item.Column>

            <p
              style={{
                fontSize: "var(--h2-size)",
                marginTop: "var(--spacing-10)",
                marginBottom: "var(--spacing-5)",
                paddingLeft: "3px",
                color: "var(--color-link-highlight)",
                fontWeight: "bold",
                fontFamily: "var(--font-family-base)",
                lineHeight: "1.2",
              }}
            >
              <a
                href="https://mauc.ufc.br/pt/nucleo-de-comunicacao/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {t('about.fullCreditsLink')}
              </a>
            </p>
          </Item.Column>

          <Mobile.Subtitle>
            {t('about.footerText')}
          </Mobile.Subtitle>
        </Item.Container>

        <Item.Container
          display="flex"
          flexDirection="row"
          justifyContent="center"
          marginTop="calc(var(--spacing-25) + var(--spacing-5))"
          gap="var(--spacing-25)"
        >
          <LogosApp
            style={{ width: "98%", height: "auto" }}
            aria-label={t('about.logosAriaLabel')}
          />
        </Item.Container>
        <Item.Container
          display="flex"
          flexDirection="row"
          justifyContent="center"
          marginTop="calc(var(--spacing-25) + var(--spacing-5))"
          height="30px"
          gap="var(--spacing-25)"
        />
      </section>
    </>
  );
};

const Email = ({ email }: { email: string }) => {
  const { t } = useTranslation();

  return (
    <Item.Row align="center" gap="var(--spacing-10)">
      <MailIcon
        style={{
          fill: "var(--color-primary)",
          width: "24px",
          height: "24px",
        }}
        aria-label={t('about.emailIconAriaLabel')}
      />
      <p
        style={{
          color: "var(--color-text-gray)",
          fontFamily: "var(--font-family-base)",
          fontWeight: "bold",
        }}
      >
        {email}
      </p>
    </Item.Row>
  );
};

const Github = ({ user }: { user: string }) => {
  const { t } = useTranslation();

  return (
    <Item.Row align="center" gap="var(--spacing-10)">
      <GithubIcon
        style={{
          fill: "var(--color-primary)",
          width: "24px",
          height: "24px",
        }}
        aria-label={t('about.githubIconAriaLabel')}
      />
      <p
        style={{
          color: "var(--color-text-gray)",
          fontFamily: "var(--font-family-base)",
          fontWeight: "bold",
        }}
      >
        {user}
      </p>
    </Item.Row>
  );
};

export default About;