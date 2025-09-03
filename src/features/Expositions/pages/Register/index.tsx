// styles
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";

// Components
import Back from "../../../../components/ui/Back";
import { Input } from "../../../../components/ui/Inputs";
import Upload from "../../../../components/ui/Inputs/Upload";
import Message from "../../../../components/ui/Feedback/Message";
import Item from "../../../../components/ui/Item";
import { Radio } from "../../../../components/ui/Inputs/Radio";

// Hooks
import { FieldValue, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// utils
import { sendFormData } from "../../../../utils/sendFormData";
import ExpositionService from "../../api/ExpositionService";
import {
  ValidationError,
  ServerCreateResponse,
  ServerError,
} from "../../../../services/api/apiService";
import { TextArea } from "../../../../components/ui/Inputs/TextArea";
import { CheckBox } from "../../../../components/ui/Inputs/CheckBox";
import { useQuery } from "@tanstack/react-query";
import ArtWorkService from "../../../ArtWorks/api/ArtWorkService";
import { ArtWork } from "../../../ArtWorks/types/ArtWork";
import PaginationControls from "../../../../components/ui/Pagination/PaginationControls";

const schema = z.object({
  title: z.string(),
  image: z.union([
    z.string(),
    z.instanceof(FileList).transform((list) => list[0]),
  ]),
  description: z.string(),
  place: z.string(),
  dateStarts: z.string(),
  dateEnds: z.string(),
  type: z.enum(["1", "2"]).transform(Number),
  artWorks: z.array(z.string()).optional().default([]),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setError,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [message, setMessage] = useState<
    ServerError | ServerCreateResponse | null
  >(null);

  const navigate = useNavigate();

  const [artworksPage, setArtworksPage] = useState(1);
  const [selectedArtworks, setSelectedArtworks] = useState<string[]>([]);

  const { data: artworks } = useQuery({
    queryKey: ["artWorks/all", artworksPage],
    queryFn: async () => await ArtWorkService.getAll<ArtWork>(artworksPage),
  });

  const onSubmit = async (data: FieldValue<typeof schema>) => {
    const formData = sendFormData(data as FormData);

    const res = await ExpositionService.create(formData);

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
          navigate(`/admin/expositions`);
        }, 2000);
      }
    }
  };

  const toggleArtwork = (id: string) => {
    setSelectedArtworks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    setValue("artWorks", selectedArtworks);
  }, [selectedArtworks, setValue]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <Back>Adicionar Exposição</Back>
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
              label="Data de inicio da Exposição"
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
                  {errors.artWorks.message?.toString()}
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

            <PaginationControls
              page={artworksPage}
              setPage={setArtworksPage}
              hasNext={!!artworks?.next}
              hasPrev={!!artworks?.prev}
              totalPages={artworks?.pages}
            />

          </section>
        </form>
      </div>
    </div>
  );
};

export default Register;
