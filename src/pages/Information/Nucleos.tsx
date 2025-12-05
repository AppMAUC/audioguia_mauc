import Mobile from "../../components/ui/Mobile";
import Item from "../../components/ui/Item";
import { MailIcon, Comunicacao, Educativo } from "../../assets";

const Nucleos = () => {
  return (
    <section>
      <Mobile.Title style={{ paddingLeft: "20px", paddingTop: "clamp(140px, calc(5 * var(--spacing-25) + var(--spacing-15)), 150px)", marginBottom: "var(--spacing-10)" }}>
        Núcleos
      </Mobile.Title>

      <Mobile.ImageDefault src={Comunicacao} alt="Logo Núcleo de Comunicação do MAUC" />

      <Mobile.Title
        style={{
          paddingLeft: "20px",
          paddingTop: "var(--spacing-15)",
          color: "var(--color-text)",
        }}
      >
        Núcleo de Comunicação{" "}
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
          aria-label="E-mail do Núcleo de Comunicação"
        />
        <p
          style={{
            color: "var(--color-text-gray)",
            fontFamily: "var(--font-family-base)",
            fontWeight: "bold",
          }}
        >
          comunicamauc@ufc.br{" "}
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
          Responsável por planejar e executar as ações de comunicação digital do
          Mauc como o site, redes sociais, Flickr e outros projetos. O NC é
          responsável por colaborar no diálogo do Mauc com seu público, sejam
          visitantes ou parceiros de realização (artistas, curadoras/es,
          pesquisadoras/es, autoridades externas ou da instituição).
        </p>
      </Item.Container>

      <Mobile.ImageDefault src={Educativo} alt="Imagem do MAUC por dentro" />
      <Mobile.Title
        style={{
          paddingLeft: "20px",
          paddingTop: "20px",
          color: "var(--color-text)",
        }}
      >
        Núcleo Educativo{" "}
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
          aria-label="E-mail do Núcleo Educativo"
        />
        <p
          style={{
            color: "var(--color-text-gray)",
            fontFamily: "var(--font-family-base)",
            fontWeight: "bold",
          }}
        >
          nemauc@ufc.br{" "}
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
          O Núcleo Educativo do Museu de Arte da UFC (Nemauc) é responsável pelo
          planejamento, gestão e execução da Política Educativa e Cultural da
          instituição, através de programas e projetos que objetivam o diálogo,
          a participação e o exercício da cidadania por meio da arte e do
          patrimônio.
        </p>
      </Item.Container>
    </section>
  );
};

export default Nucleos;
