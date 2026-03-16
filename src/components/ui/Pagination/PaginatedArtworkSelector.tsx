import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ArtWorkService from "../../../features/ArtWorks/api/ArtWorkService";
import { CheckBox } from "../Inputs/CheckBox";
import { ArtWork } from "../../../features/ArtWorks/types/ArtWork";
import { useTranslation } from "../../../features/Language/useTranslation";

interface Props {
    register: any;
    watch: any;
    setValue: any;
    errors: any;
}

const PaginatedArtworkSelector = ({ register, watch, setValue, errors }: Props) => {
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const [selectedArtworks, setSelectedArtworks] = useState<string[]>(watch("artWorks") || []);

    const { data: artworks } = useQuery({
        queryKey: ["artWorks", page],
        queryFn: () => ArtWorkService.getAll<ArtWork>(page),
    });

    useEffect(() => {
        setValue("artWorks", selectedArtworks);
    }, [selectedArtworks, setValue]);

    const toggleArtwork = (id: string) => {
        setSelectedArtworks((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };


    const getSelectedText = () => {
        const count = selectedArtworks.length;
        return count === 1
            ? t('artworkSelector.selected', { count })
            : t('artworkSelector.selected_plural', { count });
    };

    return (
        <>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <h3>{t('artworkSelector.title')}</h3>
                <p style={{ color: selectedArtworks.length === 0 ? "red" : "gray" }}>
                    {getSelectedText()}
                </p>
                {errors.artWorks && (
                    <p style={{ color: "red", fontWeight: "bold" }}>
                        {errors.artWorks.message?.toString() === "Formato de dado inválido."
                            ? t('artworkSelector.errorMin')
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
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        setPage((old) => Math.max(old - 1, 1));
                    }}
                    disabled={page <= 1 || !artworks?.prev}
                    style={{
                        marginRight: "1rem",
                        fontSize: "var(--p-size)",
                        color: (page <= 1 || !artworks?.prev)
                            ? "var(--color-state)"
                            : "var(--color-link-highlight)",
                        cursor: (page <= 1 || !artworks?.prev) ? "not-allowed" : "pointer"
                    }}
                >
                    {t('artworkSelector.previous')}
                </button>

                <span style={{
                    margin: "0 1rem",
                    fontFamily: "var(--font-family-base)",
                    color: "var(--color-text)",
                    fontSize: "var(--p-size)"
                }}>
                    {t('artworkSelector.pageInfo', {
                        page,
                        total: artworks?.pages || "?"
                    })}
                </span>

                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        if (artworks?.next) setPage((old) => old + 1);
                    }}
                    disabled={!artworks?.next}
                    style={{
                        marginLeft: "1rem",
                        fontSize: "var(--p-size)",
                        color: !artworks?.next
                            ? "var(--color-state)"
                            : "var(--color-link-highlight)",
                        cursor: !artworks?.next ? "not-allowed" : "pointer"
                    }}
                >
                    {t('artworkSelector.next')}
                </button>
            </div>
        </>
    );
};

export default PaginatedArtworkSelector;