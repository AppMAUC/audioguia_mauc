import Mobile from "../../components/ui/Mobile";
import Item from "../../components/ui/Item";
import {
  AppIcon,
  GithubIcon,
  MailIcon,
  AppMaucLogo1,
  MaucLogo,
  PPCABlackLogo,
  ProcultBlackLogo,
  LogosApp,
} from "../../assets";
import { Link } from "react-router-dom";

const About = () => {
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
          Sobre o App
        </Mobile.Title>

        <Item.Row
          width="100%"
          height="auto"
          justify="center"
          align="center"
          gap="var(--spacing-10)"
          marginTop="var(--spacing-10)"
        >
          <AppMaucLogo1 style={{ width: "90%", height: "auto" }} role="img" arial-label="Logotipo do APP Mauc" />
          {/* <AppIcon style={{ width: "90%", height: "auto" }} role="img" aria-label="Logotipo do App MAUC" /> */}
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
            aria-label="E-mail do MAUC"
          />
          <p
            style={{
              color: "var(--color-text-gray)",
              fontFamily: "var(--font-family-base)",
              fontWeight: "bold",
            }}
          >
            {"appmauc@gmail.com"}{" "}
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
          <Link to="https://github.com/appmauc" aria-label="Nome de usuário do GitHub">
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
            Este aplicativo foi desenvolvido para fornecer uma experiência de
            áudio guiada no Museu de Arte da UFC. Com ele, você pode explorar as
            exposições e obter informações detalhadas sobre as obras de arte
            diretamente no seu dispositivo móvel. O aplicativo é fácil de usar e
            oferece uma interface intuitiva, permitindo que você navegue pelas
            diferentes seções do aplicativo com facilidade. Além disso, você
            pode acessar conteúdos exclusivos e atualizações sobre eventos e
            exposições futuras. Aproveite sua visita ao museu com o
            nosso aplicativo!
          </p>

          <Item.Column gap="var(--spacing-10)">
            <Mobile.Title
              style={{
                color: "var(--color-blue-accent)",
                marginTop: "var(--spacing-25)",
              }}
            >
              Realização
            </Mobile.Title>

            <Item.Column margin="var(--spacing-10)">
              <Item.Container marginLeft={"3px"}>
                <Mobile.Subtitle>Orientador(a)</Mobile.Subtitle>
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
                Prof. Dr. Alysson Diniz dos Santos  (docente do Curso de Sistemas Mídias Digitais)
              </p>
              <Email email="alysson@virtual.ufc.br" />

            </Item.Column>

            <Item.Column margin="var(--spacing-10)">
              <Item.Container marginLeft={"3px"}>
                <Mobile.Subtitle>Bolsista Desenvolvedor</Mobile.Subtitle>
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
                Victor Emanuel Tomaz das Neves{" "}
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
                <Mobile.Subtitle>Bolsista Designer</Mobile.Subtitle>
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
                color: "var(--color-blue-accent)",
                marginTop: "var(--spacing-25)",
              }}
            >
              Colaboração
            </Mobile.Title>
            <Item.Column margin="var(--spacing-10)">
              <Item.Container marginLeft={"3px"}>
                <Mobile.Subtitle>Coordenadores</Mobile.Subtitle>
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
                  color: "var(--color-blue-default)",
                  fontWeight: "bold",
                  fontFamily: "var(--font-family-base)",
                  lineHeight: "1.2",
                }}
              >
                Acesse a ficha técnica completa.
              </p>
            </Item.Column>


          </Item.Column>

          <Mobile.Subtitle>
            Esse projeto foi realizado com o apoio da Pró-Reitoria de Cultura da
            Universidade Federal do Ceará e do Programa de Promoção da Cultura
            Artística.
          </Mobile.Subtitle>
        </Item.Container>

        <Item.Container
          display="flex"
          flexDirection="row"
          justifyContent="center"
          marginTop="calc(var(--spacing-25) + var(--spacing-5))"
          gap="var(--spacing-25)"
        >
          {/* <AppMaucLogo1 style={{ width: "100px", height: "75px" }} arial-label="Logo do APP Mauc" />
          <MaucLogo style={{ width: "100px", height: "75px" }} arial-label="Logo do MAUC" />
          <PPCABlackLogo style={{ width: "100px", height: "75px" }} arial-label="Logo PPCA" />
          <ProcultBlackLogo style={{ width: "100px", height: "75px" }} arial-label="Logo Procult" /> */}
          <LogosApp style={{ width: "98%", height: "auto" }} arial-label="Logos de realização, colaboração e apoio. Sendo elas PPCA, MAUC, PROCULT, SMD, LATAV/LEAD, FOTOGRAFIA TÁTIL, RÁDIO UNIVERSITÁRIA, PROINTER, PROGRAD E PRAE." />

        </Item.Container>
        <Item.Container
          display="flex"
          flexDirection="row"
          justifyContent="center"
          marginTop="calc(var(--spacing-25) + var(--spacing-5))"
          height="30px"
          gap="var(--spacing-25)"
        >
        </Item.Container>
      </section>
    </>
  );
};

const Email = ({ email }: { email: string }) => {
  return (
    <Item.Row align="center" gap="var(--spacing-10)">
      <MailIcon
        style={{
          fill: "var(--color-primary)",
          width: "24px",
          height: "24px",
        }}
        aria-label="E-mail"
      />
      <p
        style={{
          color: "var(--color-text-gray)",
          fontFamily: "var(--font-family-base)",
          fontWeight: "bold",
        }}
      >
        {email}{" "}
      </p>
    </Item.Row>
  );
};
const Github = ({ user }: { user: string }) => {
  return (
    <Item.Row align="center" gap="var(--spacing-10)">
      <GithubIcon
        style={{
          fill: "var(--color-primary)",
          width: "24px",
          height: "24px",
        }}
        aria-label="Usuário do GitHub"
      />
      <p
        style={{
          color: "var(--color-text-gray)",
          fontFamily: "var(--font-family-base)",
          fontWeight: "bold",
        }}
      >
        {user}{" "}
      </p>
    </Item.Row>
  );
};

export default About;
