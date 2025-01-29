import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-5">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-sea-blue text-white"
            }`}
          >
            <ChevronLeft />
          </button>
          <span className="text-lg font-medium">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-sea-blue text-white"
            }`}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default Pagination;
