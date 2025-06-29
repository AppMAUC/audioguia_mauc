//Styles
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";

// Components
import Back from "../../../../components/ui/Back";
import { Input } from "../../../../components/ui/Inputs";
import Upload from "../../../../components/ui/Inputs/Upload";
import Message from "../../../../components/ui/Feedback/Message";
import Item from "../../../../components/ui/Item";
import Mobile from "../../../../components/ui/Mobile";
import DeleteWithConfirmation from "../../../../components/ui/Inputs/Delete";
import { Radio } from "../../../../components/ui/Inputs/Radio";

// Hooks
import { FieldValue, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Utils
import { sendFormData } from "../../../../utils/sendFormData";
import ExpositionService from "../../api/ExpositionService";

//Types
import {
  ValidationError,
  ServerError,
  ServerUpdateResponse,
  ApiError,
} from "../../../../services/api/apiService";
import { Exposition } from "../../types/Exposition";
import { TextArea } from "../../../../components/ui/Inputs/TextArea";
import { useQuery } from "@tanstack/react-query";
import { ArtWork } from "../../../ArtWorks/types/ArtWork";
import ArtWorkService from "../../../ArtWorks/api/ArtWorkService";
import { CheckBox } from "../../../../components/ui/Inputs/CheckBox";
import PaginationControls from "../../../../components/ui/Pagination/PaginationControls";

const schema = z.object({
  title: z.string().optional(),
  image: z
    .union([z.string(), z.instanceof(FileList).transform((list) => list[0])])
    .optional(),
  description: z.string().optional(),
  place: z.string().optional(),
  dateStarts: z.string().optional(),
  dateEnds: z.string().optional(),
  type: z.enum(["1", "2"]).transform(Number).optional(),
  artWorks: z.array(z.string()).optional(),
});

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataIsLoading, setdataIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

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
        const exposition = await ExpositionService.getById<Exposition>(
          id || ""
        );

        return {
          title: exposition.title,
          description: exposition.description,
          place: exposition.place,
          dateStarts: exposition.dateStarts.split("T")[0],
          dateEnds: exposition.dateEnds.split("T")[0],
          type: exposition.type.toString(),
          artWorks: (exposition.artWorks as ArtWork[]).map(
            (artwork) => artwork._id
          ),
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

  const selectedArtworks = watch("artWorks") || [];

  const toggleArtwork = (id: string) => {
    const newSelected = selectedArtworks.includes(id)
      ? selectedArtworks.filter((x: string) => x !== id)
      : [...selectedArtworks, id];
    setValue("artWorks", newSelected, { shouldDirty: true });
  };



  const [message, setMessage] = useState<
    ServerError | ServerUpdateResponse | null
  >(null);

  const {
    data: artworks,
    // isLoading: artworksLoading
  } = useQuery({
    queryKey: ["artWorks/all", artworksPage],
    queryFn: async () => await ArtWorkService.getAll<ArtWork>(artworksPage),
  });


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

    const res = await ExpositionService.update(id || "", formData);

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
          navigate(`/admin/expositions`);
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
        <Back>Editar Exposição</Back>
        <Item.Container align="center" justify="center" marginTop="10px">
          <DeleteWithConfirmation
            id={id || ""}
            onDelete={() => ExpositionService.delete(id || "")}
            link="admin/expositions"
            style={{ border: "none" }}
          />
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
            justifyContent: "flex-start",
            gap: "60px",
          }}
        >
          <section style={{ width: "420px" }}>
            <Input
              type="text"
              label={"Título"}
              required
              placeholder="Insira o título da exposição"
              helperText={errors.title?.message?.toString()}
              {...register("title")}
            />

            <Radio
              first={true}
              firstLabel="Tipo de Exposição"
              label="Longa duração"
              value={1}
              required
              {...register("type")}
            />

            <Radio
              first={false}
              label="Curta duração"
              defaultChecked
              value={2}
              {...register("type")}
            />
            <TextArea
              type="text"
              label={"Descrição"}
              required
              placeholder="Adicione a descrição da exposição"
              helperText={errors.place?.message?.toString()}
              {...register("description")}
            />
            <Input
              type="date"
              label="Data de inicio da exposição"
              required
              helperText={errors.dateStarts?.message?.toString()}
              {...register("dateStarts")}
            />
            <Input
              type="date"
              label="Data de término da exposição"
              required
              helperText={errors.dateEnds?.message?.toString()}
              {...register("dateEnds")}
            />
            <Upload>
              <Upload.Input
                accept="image/png, image/jpeg"
                fileType="image"
                required
                label="Capa da exposição"
                helperText={errors.image?.message?.toString()}
                {...register("image")}
              />
            </Upload>
            <TextArea
              type="text"
              label={"Lugar"}
              required
              placeholder="Adicione o local ou sala que a exposição está"
              helperText={errors.place?.message?.toString()}
              {...register("place")}
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

            {/* Botões de paginação abaixo dos checkboxes */}
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
        <Item.Row width="100%" height="100px" align="center" justify="center">
          {message && <Message msg={message.message} type="success" />}
        </Item.Row>
      </div>
    </div>
  );
};

export default Edit;
