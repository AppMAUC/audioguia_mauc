import Back from "../../../../components/ui/Back";
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";
import { Input } from "../../../../components/ui/Inputs";
import { TextArea } from "../../../../components/ui/Inputs/TextArea";
import Upload from "../../../../components/ui/Inputs/Upload";

import { FieldValue, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { addSuffixToFileName } from "../../../../utils/addSuffixToFileName";
import { sendFormData } from "../../../../utils/sendFormData";
import ArtistService from "../../api/ArtistService";
import {
  ValidationError,
  ServerCreateResponse,
  ServerError,
} from "../../../../services/api/apiService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../../../../components/ui/Feedback/Message";
import Item from "../../../../components/ui/Item";
import { useQuery } from "@tanstack/react-query";
import ArtWorkService from "../../../ArtWorks/api/ArtWorkService";
import { ArtWork } from "../../../ArtWorks/types/ArtWork";
import { CheckBox } from "../../../../components/ui/Inputs/CheckBox";

const schema = z.object({
  name: z.string(),
  image: z.union([
    z.string(),
    z.instanceof(FileList).transform((list) => list[0]),
  ]),
  biography: z.string(),
  artWorks: z.array(z.string()),
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
  birthDate: z.string(),
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

  const { data: artworks } = useQuery({
    queryKey: ["artWorks/all"],
    queryFn: async () => await ArtWorkService.getAll<ArtWork>(),
  });

  const onSubmit = async (data: FieldValue<typeof schema>) => {
    const formData = sendFormData(data as FormData);

    const res = await ArtistService.create(formData);

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
          navigate(`/admin/artists`);
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
        <Back>Adicionar Artista</Back>
      </header>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            gap: "60px",
          }}
        >
          {" "}
          <section style={{ width: "420px" }}>
            <Input
              type="text"
              label={"Nome do Artista"}
              required
              placeholder="Insira o nome do artista"
              helperText={errors.name?.message?.toString()}
              {...register("name")}
            />
            <Upload>
              <Upload.Input
                accept="image/png, image/jpeg"
                fileType="image"
                required
                label="Foto do artista"
                helperText={errors.image?.message?.toString()}
                {...register("image")}
              />
            </Upload>
            <TextArea
              label="Biografia"
              required
              helperText={errors.biography?.message?.toString()}
              {...register("biography")}
            />
            <Upload>
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
              type="date"
              label="Data de nascimento do artista"
              required
              helperText={errors.birthDate?.message?.toString()}
              {...register("birthDate")}
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
          </section>
          <section
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              gap: "15px",
              alignItems: "start",
              height: "auto",
              boxSizing: "border-box",
            }}
          >
            <Item.Row align="center" justify="start" gap="var(--spacing-10)">
              <Item.Title>Selecionar Obras</Item.Title>
              <p
                style={{
                  fontFamily: "var(--font-family-base)",
                  fontSize: "var(--h3-size)",
                  fontWeight: "bold",
                  color: `${
                    !watch("artWorks") || watch("artWorks")?.length == 0
                      ? "var(--color-error)"
                      : "var(--color-text-gray)"
                  }`,
                }}
              >
                (
                {!watch("artWorks") || watch("artWorks")?.length == 0
                  ? 0
                  : watch("artWorks").length}{" "}
                selecionadas)
              </p>
              {errors.artWorks && (
                <p
                  style={{
                    fontFamily: "var(--font-family-base)",
                    fontSize: "var(--h3-size)",
                    fontWeight: "bold",
                    color: "var(--color-error)",
                  }}
                >
                  {errors.artWorks.message?.toString() ==
                  "Formato de dado inválido."
                    ? "Selecione ao menos duas obras"
                    : errors.artWorks.message?.toString()}
                </p>
              )}
            </Item.Row>
            {artworks?.data.map((artwork) => (
              <CheckBox
                key={artwork._id}
                title={artwork.title}
                year={artwork.year}
                author={artwork.author}
                image={artwork.image.url}
                {...register("artWorks")}
                value={artwork._id}
              />
            ))}
          </section>
        </form>
      </div>
    </div>
  );
};

export default Register;
