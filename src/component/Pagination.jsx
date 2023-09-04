import React from 'react';

export default function Pagination({ currentPage, setCurrentPage }) {
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className="button-section m-4">
            <button
                type="button"
                className="btn btn-primary me-1"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <button
                type="button"
                className="btn btn-primary ms-1"
                onClick={goToNextPage}
            >
                Next
            </button>
        </div>
    );
}
