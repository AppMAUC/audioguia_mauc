// components/ui/PaginatedArtworkSelector.tsx
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ArtWorkService from "../../../features/ArtWorks/api/ArtWorkService";
import { CheckBox } from "../Inputs/CheckBox";
import { ArtWork } from "../../../features/ArtWorks/types/ArtWork";

interface Props {
    register: any;
    watch: any;
    setValue: any;
    errors: any;
}

const PaginatedArtworkSelector = ({ register, watch, setValue, errors }: Props) => {
    const [page, setPage] = useState(1);
    const [selectedArtworks, setSelectedArtworks] = useState<string[]>(watch("artWorks") || []);

    const { data: artworks } = useQuery({
        queryKey: ["artWorks", page],
        queryFn: () => ArtWorkService.getAll<ArtWork>(page),
    });

    // Atualiza o form hook sempre que a seleção mudar
    useEffect(() => {
        setValue("artWorks", selectedArtworks);
    }, [selectedArtworks, setValue]);

    const toggleArtwork = (id: string) => {
        setSelectedArtworks((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    return (
        <>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <h3>Selecionar Obras</h3>
                <p style={{ color: selectedArtworks.length === 0 ? "red" : "gray" }}>
                    ({selectedArtworks.length} selecionadas)
                </p>
                {errors.artWorks && (
                    <p style={{ color: "red", fontWeight: "bold" }}>
                        {errors.artWorks.message?.toString() === "Formato de dado inválido."
                            ? "Selecione ao menos duas obras"
                            : errors.artWorks.message?.toString()}
                    </p>
                )}
            </div>

            {artworks?.data.map((artwork) => (
                <CheckBox
                    key={artwork._id}
                    title={artwork.title}
                    year={artwork.year}
                    author={artwork.author}
                    image={artwork.image.url}
                    {...register("artWorks")}
                    value={artwork._id}
                    checked={selectedArtworks.includes(artwork._id)}
                    onChange={() => toggleArtwork(artwork._id)}
                />
            ))}

            <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setPage((old) => Math.max(old - 1, 1));
                    }}
                    disabled={page <= 1 || !artworks?.prev}
                >
                    Anterior
                </button>
                <span style={{ margin: "0 1rem" }}>
                    Página {page} de {artworks?.pages || "?"}
                </span>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        if (artworks?.next) setPage((old) => old + 1);
                    }}
                    disabled={!artworks?.next}
                >
                    Próximo
                </button>
            </div>
        </>
    );
};

export default PaginatedArtworkSelector;
