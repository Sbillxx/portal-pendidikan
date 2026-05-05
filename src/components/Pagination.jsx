import { memo } from 'react';
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";


const Pagination = memo(({ totalPages, currentPage, onPageChange }) => {
  const maxVisible = 5; // max pages shown at once
  const half = Math.floor(maxVisible / 2);

  // Tentukan start & end page
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + maxVisible - 1);

  // Adjust jika mendekati akhir
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  const pageNumbers = [];
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4 items-center space-x-1">
      {/* Prev Arrow */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 border rounded bg-white dark:bg-neutral-900 disabled:opacity-50"
      >
        <HiArrowLeft/>
      </button>

      {/* First page + ellipsis */}
      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 border rounded bg-white dark:bg-neutral-900"
          >
            1
          </button>
          <span className="px-2">...</span>
        </>
      )}

      {/* Main page numbers */}
      {pageNumbers.map((number) => (
        <button
          aria-label='number'
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 border rounded ${number === currentPage
              ? "bg-idi-800 text-white  dark:bg-neutral-800 dark:border-neutral-500"
              : "bg-white dark:bg-neutral-900"
            }`}
        >
          {number}
        </button>
      ))}

      {/* Last page + ellipsis */}
      {end < totalPages && (
        <>
          <span className="px-2">...</span>
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 border rounded bg-white dark:bg-neutral-900"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Arrow */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border rounded bg-white dark:bg-neutral-900 disabled:opacity-50"
      >
        <HiArrowRight />
      </button>
    </div>
  );
});

export default Pagination;
