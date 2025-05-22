import Mobile from "../../components/ui/Mobile";
import Item from "../../components/ui/Item";
import { CallIcon, MailIcon } from "../../assets";
import { Biblioteca as Image } from "../../assets";

const Biblioteca = () => {
  return (
    <section>
      <Mobile.Title style={{ paddingLeft: "20px", paddingTop: "140px", marginBottom: "var(--spacing-10-md)" }}>
        Biblioteca
      </Mobile.Title>
      <Mobile.ImageDefault src={Image} alt="Ícone de chamada"/>
      <Item.Row
        justify="start"
        align="center"
        gap="var(--spacing-5)"
        marginTop="var(--spacing-25-sm)"
      >
        <CallIcon
          style={{
            fill: "var(--color-primary)",
            width: "auto",
            paddingLeft: "20px",
            paddingRight: "10px",
          }}
        />
        <p
          style={{
            color: "var(--color-text-gray)",
            fontFamily: "var(--font-family-base)",
            fontWeight: "bold",
          }}
        >
          +55 85 3366 7481{" "}
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
        />
        <p
          style={{
            color: "var(--color-text-gray)",
            fontFamily: "var(--font-family-base)",
            fontWeight: "bold",
          }}
        >
          bibliotecamauc@ufc.br{" "}
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
          A Biblioteca Floriano Teixeira mantém um acervo especializado em
          artes, constituído de livros, catálogos, periódicos, folhetos, entre
          outros tipos de documentos. Dentre as coleções especiais, contamos com
          a coleção Jean-Pierre Chabloz, formada por livros e revistas da
          biblioteca particular do artista. Além da coleção de obras raras,
          composta por diapositivos, fitas de vídeo, revistas, folhetos e livros
          raros.
          <br />
          <br />
          Serviços Oferecidos:
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
          <li>Consulta local e on-line do acervo</li>
          <li>Orientação na pesquisa bibliográfica</li>
          <li>Levantamento bibliográfico</li>
        </ul>
      </Item.Container>
    </section>
  );
};

export default Biblioteca;
