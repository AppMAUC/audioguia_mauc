import React from "react";

interface Props {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    hasNext: boolean;
    hasPrev: boolean;
    totalPages?: number;
}

const PaginationControls = ({ page, setPage, hasNext, hasPrev, totalPages }: Props) => {
    return (
        <nav aria-label="Controles de paginação" style={{ marginTop: "2rem", textAlign: "center" }}>
            <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={!hasPrev}
                aria-label="Página anterior"
                style={{ marginRight: "1rem" }}
            >
                Anterior
            </button>

            <span aria-live="polite" style={{
                fontFamily: "var(--font-family-base)",
                fontWeight: 600,
            }}>
                Página {page} {totalPages && `de ${totalPages}`}
            </span>

            <button
                onClick={() => setPage(prev => (hasNext ? prev + 1 : prev))}
                disabled={!hasNext}
                aria-label="Próxima página"
                style={{ marginLeft: "1rem" }}
            >
                Próximo
            </button>
        </nav>
    );
};

export default PaginationControls;
