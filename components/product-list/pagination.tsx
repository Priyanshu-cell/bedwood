
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center mt-8">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-4 py-2 mx-1 bg-gray-600 text-black rounded "
            >
                Previous
            </button>
            <span className="px-4 py-2 mx-1 bg-gray-500 text-gray-800 rounded">{currentPage}</span>
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-4 py-2 mx-1 bg-gray-600 text-black rounded"
            >
                Next
            </button>
        </div>
    );
};


