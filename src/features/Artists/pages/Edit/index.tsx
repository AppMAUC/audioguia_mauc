//Styles
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";

// Components
import Back from "../../../../components/ui/Back";
import { Input } from "../../../../components/ui/Inputs";
import { TextArea } from "../../../../components/ui/Inputs/TextArea";
import Upload from "../../../../components/ui/Inputs/Upload";
import Message from "../../../../components/ui/Feedback/Message";
import Item from "../../../../components/ui/Item";
import DeleteWithConfirmation from "../../../../components/ui/Inputs/Delete";
import Mobile from "../../../../components/ui/Mobile";
import PaginationControls from "../../../../components/ui/Pagination/PaginationControls";

// Hooks
import { FieldValue, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Utils
import { addSuffixToFileName } from "../../../../utils/addSuffixToFileName";
import { sendFormData } from "../../../../utils/sendFormData";
import ArtistService from "../../api/ArtistService";

//Types
import {
  ValidationError,
  ServerError,
  ServerUpdateResponse,
  ApiError,
} from "../../../../services/api/apiService";
import { Artist } from "../../types/Artist";
import { CheckBox } from "../../../../components/ui/Inputs/CheckBox";
import { useQuery } from "@tanstack/react-query";
import ArtWorkService from "../../../ArtWorks/api/ArtWorkService";
import { ArtWork } from "../../../ArtWorks/types/ArtWork";

const schema = z.object({
  name: z.string().optional(),
  image: z
    .union([z.string(), z.instanceof(FileList).transform((list) => list[0])])
    .optional(),
  biography: z.string().optional(),
  artWorks: z.array(z.string()).optional(),
  audioGuia: z.array(
    z
      .union([
        z.string(),
        z.instanceof(FileList).transform((list, ctx) => {
          const file = list[0];
          const lang = ctx.path[1] === 0 ? "br" : "en"; // Determina o idioma baseado no índice
          return file ? addSuffixToFileName(file, lang) : "";
        }),
      ])
      .optional()
  ),
  birthDate: z.string().optional(),
});

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataIsLoading, setdataIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  // Estado para paginação da lista de obras
  const [artworksPage, setArtworksPage] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty, isSubmitting },
    watch,
    setError,
    setValue,
  } = useForm({
    defaultValues: async () => {
      try {
        const artist = await ArtistService.getById<Artist>(id || "");

        const audiGuiaArray = artist.audioGuia.map((audio) => audio.url);

        return {
          name: artist.name,
          image: artist.image.url,
          biography: artist.biography,
          artWorks: (artist.artWorks as ArtWork[]).map(
            (artwork) => artwork._id
          ),
          audioGuia: [...audiGuiaArray],
          birthDate: artist.birthDate,
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

  const { data: artworks } = useQuery({
    queryKey: ["artWorks/all", artworksPage],
    queryFn: async () => await ArtWorkService.getAll<ArtWork>(artworksPage),
  });

  // Seleção atual de obras no form (array de ids)
  const selectedArtworks = watch("artWorks") || [];

  // Função para alternar seleção de uma obra
  const toggleArtwork = (id: string) => {
    const newSelected = selectedArtworks.includes(id)
      ? selectedArtworks.filter((x: string) => x !== id)
      : [...selectedArtworks, id];
    setValue("artWorks", newSelected, { shouldDirty: true });
  };

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

    const res = await ArtistService.update(id || "", formData);

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
          navigate(`/admin/artists`);
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

  if (serverError) {
    return <Mobile.Error404 />;
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <Back>Editar Artista</Back>
        <Item.Container align="center" justify="center" marginTop="10px">
          {id && (
            <DeleteWithConfirmation
              id={id}
              onDelete={() => ArtistService.delete(id)}
              link="admin/artists"
              style={{ border: "none" }}
            />
          )}
        </Item.Container>
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
            justifyContent: "space-between",
            gap: "60px",
          }}
        >
          <section style={{ width: "420px" }}>
            <Input
              type="text"
              label={"Nome do Artista"}
              placeholder="Insira o nome do artista"
              helperText={errors.name?.message?.toString()}
              {...register("name")}
            />
            <Upload>
              <Upload.Input
                accept="image/png, image/jpeg"
                fileType="image"
                label="Foto do artista"
                helperText={errors.image?.message?.toString()}
                {...register("image")}
              />
            </Upload>
            <TextArea
              label="Biografia"
              helperText={errors.biography?.message?.toString()}
              {...register("biography")}
            />
            <Upload>
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
              type="date"
              label="Data de nascimento do artista"
              helperText={errors.birthDate?.message?.toString()}
              {...register("birthDate")}
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
                  color: `${!watch("artWorks") || watch("artWorks")?.length == 0
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
                value={artwork._id}
                checked={selectedArtworks.includes(artwork._id)}
                onChange={() => toggleArtwork(artwork._id)}
              />
            ))}

            {/* Paginação */}
            {artworks && (
              <PaginationControls
                page={artworksPage}
                setPage={setArtworksPage}
                hasNext={!!artworks.next}
                hasPrev={!!artworks.prev}
                totalPages={artworks.pages}
              />
            )}



          </section>
        </form>
      </div>
    </div>
  );
};

export default Edit;
