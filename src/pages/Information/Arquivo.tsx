import Mobile from "../../components/ui/Mobile";
import Item from "../../components/ui/Item";
import { CallIcon, MailIcon } from "../../assets";
import { Arquivo as Image } from "../../assets";

const Arquivo = () => {
  return (
    <section>
      <Mobile.Title style={{ paddingLeft: "20px", paddingTop: "140px", paddingBottom: "var(--spacing-10-md)" }}>
        Arquivo
      </Mobile.Title>
      <Mobile.ImageDefault src={Image} alt="imagem do depósito de arquivos institucionais " />
      <Mobile.Title
        style={{
          paddingLeft: "20px",
          paddingTop: "var(--spacing-25-sm)",
          color: "var(--color-text)",
        }}
      >
        Arquivo Institucional
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
          aria-label="Número de telefone do Arquivo Institucional"
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
          aria-label="Email do Arquivo Institucional: "
        />
        <p
          style={{
            color: "var(--color-text-gray)",
            fontFamily: "var(--font-family-base)",
            fontWeight: "bold",
          }}
        >
          arquivomauc@ufc.br{" "}
        </p>
      </Item.Row>

      <Item.Container padding="0 20px" marginBottom="35px">
        <p
          style={{
            fontSize: "var(--font-size)",
            marginTop: "var(--spacing-5)",
            color: "var(--color-text)",
            fontFamily: "var(--font-family-base)",
            lineHeight: "1.2",
          }}
        >
          Criado a partir da guarda de documentos referente às atividades do
          Museu desde sua fundação em 1961, o Arquivo Institucional do Mauc é
          constituído de relatórios anuais, correspondências, fotos, livros de
          assinaturas de visitantes, catálogos de exposições e documentações dos
          artistas que integram o circuito expositivo do museu. Esse acervo
          salvaguarda registros de passagens expressivas e históricas para a UFC
          e para a memória artística do Ceará.
        </p>
      </Item.Container>

      <Mobile.Title
        style={{
          paddingLeft: "20px",
          paddingTop: "var(--spacing-25-sm)",
          color: "var(--color-text)",
        }}
      >
        Arquivo Histórico – Jean-Pierre Chabloz{" "}
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
          Abrange um conjunto de documentos pessoais referentes às atividades
          artísticas do suíço Jean-Pierre Chabloz realizadas na Europa na década
          de 30 e no Brasil, de forma descontínua, entre as décadas de 40 e 80.
          Destacam-se os documentos sobre as atividades realizadas em Fortaleza
          durante a década de 40, em especial as documentações produzidas, em
          1943, para o Serviço de Mobilização de Trabalhadores para a Amazônia –
          SEMTA. Este último conjunto recebeu, em 2016, o Selo da Unesco em seu
          Programa Memória do Mundo devido à sua importância e relevância
          temática.
        </p>
      </Item.Container>
    </section>
  );
};

export default Arquivo;
