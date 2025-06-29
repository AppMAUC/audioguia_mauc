//Styles
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";

// Components
import Back from "../../../../components/ui/Back";
import { Input } from "../../../../components/ui/Inputs";
import { TextArea } from "../../../../components/ui/Inputs/TextArea";
import Upload from "../../../../components/ui/Inputs/Upload";
import ArtWorks from "../../components/Preview";
import Message from "../../../../components/ui/Feedback/Message";
import Item from "../../../../components/ui/Item";

// Hooks
import { FieldValue, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Utils
import { addSuffixToFileName } from "../../../../utils/addSuffixToFileName";
import { sendFormData } from "../../../../utils/sendFormData";
import ArtWorkService from "../../api/ArtWorkService";

//Types
import {
  ValidationError,
  ServerError,
  ServerUpdateResponse,
  ApiError,
} from "../../../../services/api/apiService";
import { ArtWork } from "../../types/ArtWork";
import Mobile from "../../../../components/ui/Mobile";
import DeleteWithConfirmation from "../../../../components/ui/Inputs/Delete";

const schema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z
    .union([z.string(), z.instanceof(FileList).transform((list) => list[0])])
    .optional(),
  author: z.string().optional(),
  suport: z.string().optional(),
  year: z.string().optional(),
  dimension: z.string().optional(),
  audioGuia: z
    .array(
      z.union([
        z.string(),
        z.instanceof(FileList).transform((list, ctx) => {
          const file = list[0];
          const lang = ctx.path[1] === 0 ? "br" : "en"; // Determina o idioma baseado no índice
          return file ? addSuffixToFileName(file, lang) : "";
        }),
      ])
    )
    .optional(),
  audioDesc: z
    .array(
      z.union([
        z.string(),
        z.instanceof(FileList).transform((list, ctx) => {
          const file = list[0];
          const lang = ctx.path[1] === 0 ? "br" : "en"; // Determina o idioma baseado no índice
          return file ? addSuffixToFileName(file, lang) : "";
        }),
      ])
    )
    .optional(),
});

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataIsLoading, setdataIsLoading] = useState(false);
  const [ServerError, setServerError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty, isSubmitting },
    watch,
    setError,
  } = useForm({
    defaultValues: async () => {
      try {
        const artWork = await ArtWorkService.getById<ArtWork>(id || "");

        const audiGuiaArray = artWork.audioGuia.map((audio) => audio.url);
        const audioDescArray = artWork.audioDesc.map((audio) => audio.url);

        return {
          title: artWork.title,
          image: artWork.image.url,
          description: artWork.description,
          dimension: artWork.dimension,
          audioGuia: [...audiGuiaArray],
          audioDesc: [...audioDescArray],
          year: artWork.year,
          author: artWork.author,
          suport: artWork.suport,
        };
      } catch (error) {
        if (((error as ApiError).message = "Identificador inválido")) {
          setServerError(true);
        }
      } finally {
        setdataIsLoading(true);
      }
    },
    resolver: zodResolver(schema),
  });

  const [message, setMessage] = useState<
    ServerError | ServerUpdateResponse | null
  >(null);

  const onSubmit = async (
    data: FieldValue<typeof schema> & Record<string, any>
  ) => {
    const newData = Object.keys(dirtyFields).reduce(
      (acc: Record<string, any>, key) => {
        acc[key] = data[key as keyof typeof data];
        return acc;
      },
      {} as Record<string, any>
    );

    const formData = sendFormData(newData as FormData);

    const res = await ArtWorkService.update(id || "", formData);

    if ((res as ServerError).errors) {
      (res as ServerError).errors.forEach((error: ValidationError) => {
        setError(error.field as keyof typeof schema.shape, {
          message: error.message,
        });
      });
    } else {
      if (res as ServerUpdateResponse) {
        setMessage(res as ServerUpdateResponse);
        setTimeout(() => {
          navigate(`/admin/artworks`);
        }, 2000);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!dataIsLoading) {
    return <Mobile.Loading />;
  }

  if (ServerError) {
    return <Mobile.Error404 />;
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <Back>Editar Obra</Back>
      </header>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <section style={{ width: "420px" }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Input
              type="text"
              label={"Nome da Obra"}
              placeholder="Insira o nome da Obra"
              helperText={errors.title?.message?.toString()}
              {...register("title")}
            />
            <Upload>
              <Upload.Input
                accept="image/png, image/jpeg"
                fileType="image"
                label="Foto da Obra"
                helperText={errors.image?.message?.toString()}
                {...register("image")}
              />
            </Upload>
            <Input
              type="text"
              label={"Nome do Autor"}
              placeholder="Insira o nome do autor da obra"
              helperText={errors.author?.message?.toString()}
              {...register("author")}
            />
            <Input
              type="text"
              label={"Técnica"}
              placeholder="Insira a técnica utilizada na obra"
              helperText={errors.suport?.message?.toString()}
              {...register("suport")}
            />
            <TextArea
              label="Descrição"
              placeholder="Adicione a descrição da obra"
              helperText={errors.description?.message?.toString()}
              {...register("description")}
            />
            <Upload>
              <Upload.Input
                accept="audio/mpeg"
                fileType="audio"
                label="Áudio Descrição em protuguês"
                helperText={errors.audioDesc?.message?.toString()}
                {...register("audioDesc.0")}
              />
              <Upload.Input
                accept="audio/mpeg"
                fileType="audio"
                label="Áudio guia em português"
                helperText={errors.audioGuia?.message?.toString()}
                {...register("audioGuia.0")}
              />
              <Upload.Input
                accept="audio/mpeg"
                fileType="audio"
                label="Áudio guia em inglês"
                helperText={errors.audioGuia?.message?.toString()}
                {...register("audioGuia.1")}
              />
            </Upload>
            <Input
              type="text"
              label={"Ano"}
              placeholder="Adicione o ano da obra"
              helperText={errors.year?.message?.toString()}
              {...register("year")}
            />
            <Input
              type="text"
              label={"Dimensões"}
              placeholder="Adicione as dimensões da obra"
              helperText={errors.dimension?.message?.toString()}
              {...register("dimension")}
            />
            {isDirty ? (
              <Input
                type="submit"
                value={isSubmitting ? "Salvando..." : "Salvar"}
                disabled={isSubmitting}
              />
            ) : (
              <Input
                type="submit"
                value="Salvar"
                disabled
                style={{
                  border: "none",
                  color: "var(--color-input)",
                  backgroundColor: "var(--color-state)",
                }}
              />
            )}
          </form>
          <Item.Container align="center" justify="center" marginTop="10px">
            {id && (
              <DeleteWithConfirmation
                id={id}
                onDelete={() => ArtWorkService.delete(id)}
                link="admin/artworks"
              />
            )}
          </Item.Container>
          <Item.Row width="100%" height="100px" align="center" justify="center">
            {message && <Message msg={message.message} type="success" />}
          </Item.Row>
        </section>
        <section style={{ width: "420px" }}>
          <ArtWorks
            image={watch("image")}
            title={watch("title")}
            description={watch("description")}
            audioGuia={watch("audioGuia.0")}
            audioDesc={watch("audioDesc.0")}
          />
        </section>
      </div>
    </div>
  );
};

export default Edit;
