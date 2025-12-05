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
                style={{
                    marginRight: "1rem",
                    fontSize: "var(--p-size)",
                    color: hasPrev
                        ? "var(--color-link-highlight)"
                        : "var(--color-state)",
                }}
            >
                Anterior
            </button>

            <span aria-live="polite" style={{
                fontFamily: "var(--font-family-base)",
                color: "var(--color-text)",
                fontSize: "var(--p-size)",
                fontWeight: 600,
            }}>
                Página {page} {totalPages && `de ${totalPages}`}
            </span>

            <button
                onClick={() => setPage(prev => (hasNext ? prev + 1 : prev))}
                disabled={!hasNext}
                aria-label="Próxima página"
                style={{
                    marginLeft: "1rem",
                    fontSize: "var(--p-size)",
                    color: hasNext
                        ? "var(--color-link-highlight)"
                        : "var(--color-state)"
                }}
            >
                Próximo
            </button>
        </nav>
    );
};

export default PaginationControls;
