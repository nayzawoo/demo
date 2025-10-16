import React from 'react';

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, lastPage, onPageChange }) => {
    if (lastPage <= 1) return null;

    const getPages = () => {
        const pages = [];
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(lastPage, currentPage + 2);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <nav aria-label="Pagination">
            <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                <li>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        &laquo;
                    </button>
                </li>
                {getPages().map(page => (
                    <li key={page}>
                        <button
                            style={{
                                fontWeight: page === currentPage ? 'bold' : 'normal',
                                margin: '0 4px'
                            }}
                            onClick={() => onPageChange(page)}
                            disabled={page === currentPage}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        disabled={currentPage === lastPage}
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;