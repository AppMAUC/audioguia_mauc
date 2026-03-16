import React from "react";
import { useTranslation } from "../../../features/Language/useTranslation"; // Import do hook

interface Props {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    hasNext: boolean;
    hasPrev: boolean;
    totalPages?: number;
}

const PaginationControls = ({ page, setPage, hasNext, hasPrev, totalPages }: Props) => {
    const { t } = useTranslation(); // Hook de tradução

    return (
        <nav
            aria-label={t('pagination.navAriaLabel')}
            style={{ marginTop: "2rem", textAlign: "center" }}
        >
            <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={!hasPrev}
                aria-label={t('pagination.previousAriaLabel')}
                style={{
                    marginRight: "1rem",
                    fontSize: "var(--p-size)",
                    color: hasPrev
                        ? "var(--color-link-highlight)"
                        : "var(--color-state)",
                }}
            >
                {t('pagination.previous')}
            </button>

            <span
                aria-live="polite"
                style={{
                    fontFamily: "var(--font-family-base)",
                    color: "var(--color-text)",
                    fontSize: "var(--p-size)",
                    fontWeight: 600,
                }}
            >
                {totalPages
                    ? t('pagination.pageInfoWithTotal', { page, totalPages })
                    : t('pagination.pageInfo', { page })
                }
            </span>

            <button
                onClick={() => setPage(prev => (hasNext ? prev + 1 : prev))}
                disabled={!hasNext}
                aria-label={t('pagination.nextAriaLabel')}
                style={{
                    marginLeft: "1rem",
                    fontSize: "var(--p-size)",
                    color: hasNext
                        ? "var(--color-link-highlight)"
                        : "var(--color-state)"
                }}
            >
                {t('pagination.next')}
            </button>
        </nav>
    );
};

export default PaginationControls;