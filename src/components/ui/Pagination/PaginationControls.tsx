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
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={!hasPrev}
                style={{ marginRight: "1rem" }}
            >
                Anterior
            </button>

            <span>
                Página {page} {totalPages && `de ${totalPages}`}
            </span>

            <button
                onClick={() => setPage(prev => (hasNext ? prev + 1 : prev))}
                disabled={!hasNext}
                style={{ marginLeft: "1rem" }}
            >
                Próximo
            </button>
        </div>
    );
};

export default PaginationControls;
