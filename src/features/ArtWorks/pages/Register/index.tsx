import Back from "../../../../components/ui/Back";
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";
import { Input } from "../../../../components/ui/Inputs";
import { TextArea } from "../../../../components/ui/Inputs/TextArea";
import Upload from "../../../../components/ui/Inputs/Upload";
import ArtWorks from "../../components/Preview";

import { FieldValue, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { addSuffixToFileName } from "../../../../utils/addSuffixToFileName";
import { sendFormData } from "../../../../utils/sendFormData";
import ArtWorkService from "../../api/ArtWorkService";
import {
  ValidationError,
  ServerCreateResponse,
  ServerError,
} from "../../../../services/api/apiService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../../../../components/ui/Feedback/Message";
import Item from "../../../../components/ui/Item";

const schema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.union([
    z.string(),
    z.instanceof(FileList).transform((list) => list[0]),
  ]),
  author: z.string(),
  suport: z.string(),
  year: z.string(),
  dimension: z.string(),
  audioGuia: z.array(
    z.union([
      z.string(),
      z.instanceof(FileList).transform((list, ctx) => {
        const file = list[0];
        const lang = ctx.path[1] === 0 ? "br" : "en"; // Determina o idioma baseado no índice
        return file ? addSuffixToFileName(file, lang) : "";
      }),
    ])
  ),
  audioDesc: z.array(
    z.union([
      z.string(),
      z.instanceof(FileList).transform((list, ctx) => {
        const file = list[0];
        const lang = ctx.path[1] === 0 ? "br" : "en"; // Determina o idioma baseado no índice
        return file ? addSuffixToFileName(file, lang) : "";
      }),
    ])
  ),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    watch,
    setError,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [message, setMessage] = useState<
    ServerError | ServerCreateResponse | null
  >(null);
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValue<typeof schema>) => {
    const formData = sendFormData(data as FormData);

    const res = await ArtWorkService.create(formData);

    if ((res as ServerError).errors) {
      (res as ServerError).errors.forEach((error: ValidationError) => {
        setError(error.field, {
          message: error.message,
        });
      });
    } else {
      if (res as ServerCreateResponse) {
        setMessage(res as ServerCreateResponse);
        setTimeout(() => {
          navigate(`/admin/artworks`);
        }, 2000);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <Back>Adicionar Obra</Back>
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
              required
              placeholder="Insira o nome da Obra"
              helperText={errors.title?.message?.toString()}
              {...register("title")}
            />
            <Upload>
              <Upload.Input
                accept="image/png, image/jpeg"
                fileType="image"
                required
                label="Foto da Obra"
                helperText={errors.image?.message?.toString()}
                {...register("image")}
              />
            </Upload>
            <Input
              type="text"
              label={"Nome do Autor"}
              required
              placeholder="Insira o nome do autor da obra"
              helperText={errors.author?.message?.toString()}
              {...register("author")}
            />
            <Input
              type="text"
              label={"Técnica"}
              required
              placeholder="Insira a técnica utilizada na obra"
              helperText={errors.suport?.message?.toString()}
              {...register("suport")}
            />
            <TextArea
              label="Descrição"
              placeholder="Adicione a descrição da obra"
              required
              helperText={errors.description?.message?.toString()}
              {...register("description")}
            />
            <Upload>
              <Upload.Input
                accept="audio/mpeg"
                fileType="audio"
                required
                label="Áudio Descrição em protuguês"
                helperText={errors.audioDesc?.message?.toString()}
                {...register("audioDesc.0")}
              />
              <Upload.Input
                accept="audio/mpeg"
                fileType="audio"
                required
                label="Áudio guia em português"
                helperText={errors.audioGuia?.message?.toString()}
                {...register("audioGuia.0")}
              />
              <Upload.Input
                accept="audio/mpeg"
                fileType="audio"
                required
                label="Áudio guia em inglês"
                helperText={errors.audioGuia?.message?.toString()}
                {...register("audioGuia.1")}
              />
            </Upload>
            <Input
              type="text"
              label={"Ano"}
              required
              placeholder="Adicione o ano da obra"
              helperText={errors.year?.message?.toString()}
              {...register("year")}
            />
            <Input
              type="text"
              label={"Dimensões"}
              required
              placeholder="Adicione as dimensões da obra"
              helperText={errors.dimension?.message?.toString()}
              {...register("dimension")}
            />
            {isDirty ? (
              <Input
                type="submit"
                value={isSubmitting ? "Criando..." : "Criar"}
                disabled={isSubmitting}
              />
            ) : (
              <Input
                type="submit"
                value="Criar"
                disabled
                style={{
                  border: "none",
                  color: "var(--color-input)",
                  backgroundColor: "var(--color-state)",
                }}
              />
            )}
            <Item.Row
              width="100%"
              height="100px"
              align="center"
              justify="center"
            >
              {message && <Message msg={message.message} type="success" />}
            </Item.Row>
          </form>
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

export default Register;
