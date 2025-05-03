import React from 'react';

import ReactPaginate from 'react-paginate';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (selectedItem: { selected: number }) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <div className="py-6 px-4 mt-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm">
                    <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">
                        Page {currentPage + 1}
                    </span>
                    <span className="text-gray-600">
                        of {Math.max(1, totalPages)}
                    </span>
                </div>

                <ReactPaginate
                    previousLabel={
                        <div className="flex items-center gap-2 text-sm font-medium px-4 py-1 bg-primary text-white rounded-full">
                            <span>Prev</span>
                        </div>
                    }
                    nextLabel={
                        <div className="flex items-center gap-2 text-sm font-medium px-4 py-1 bg-primary text-white rounded-full">
                            <span>Next</span>
                        </div>
                    }
                    breakLabel={
                        <span className="flex items-center justify-center w-9 h-9 text-gray-400">
                            •••
                        </span>
                    }
                    pageCount={Math.max(1, totalPages)}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    onPageChange={onPageChange}
                    forcePage={currentPage}
                    containerClassName={'flex items-center gap-1 sm:gap-2'}
                    pageClassName={'flex'}
                    pageLinkClassName={`
                        flex items-center justify-center w-9 h-9 rounded-lg
                        text-sm font-medium text-gray-700
                        hover:bg-gray-50 hover:text-indigo-600
                        transition-colors duration-200
                    `}
                    previousClassName={'flex'}
                    previousLinkClassName={`
                        flex items-center px-3 h-9 rounded-lg
                        text-gray-700 font-medium
                        hover:bg-gray-50 hover:text-indigo-600
                        transition-colors duration-200
                    `}
                    nextClassName={'flex'}
                    nextLinkClassName={`
                        flex items-center px-3 h-9 rounded-lg
                        text-gray-700 font-medium
                        hover:bg-gray-50 hover:text-indigo-600
                        transition-colors duration-200
                    `}
                    breakClassName={'flex'}
                    breakLinkClassName={'flex items-center justify-center'}
                    activeClassName={`
                        !bg-primary/10 !text-primary
                        font-semibold
                        ring-1 ring-primary/20
                        hover:!bg-primary/20
                    `}
                    disabledClassName={`
                        opacity-50 cursor-not-allowed
                        hover:bg-transparent hover:text-gray-700
                    `}
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
};