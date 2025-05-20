"use client"

import { useState } from "react"

export default function PaginationControls() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 4 // Represents the number of main sections

  const handlePageChange = (page: number) => {
    setCurrentPage(page)

    // Scroll to the appropriate section
    const sections = ["hero", "about", "projects", "skills"]
    const targetSection = document.getElementById(sections[page - 1] || "")

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" })
    } else if (page === 1) {
      // If it's the first page and no hero id, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="py-8 border-t border-sepia-300" style={{ backgroundColor: "#c4bdb3" }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-xs border-t border-b border-opacity-30" style={{ borderColor: "#1b1b19" }}></div>
          <div className="flex items-center justify-center" style={{ color: "#1b1b19" }}>
            <span
              className={`mx-2 cursor-pointer ${currentPage === 1 ? "opacity-50" : "hover:underline"}`}
              onClick={() => currentPage > 1 && handlePageChange(Math.max(1, currentPage - 1))}
              style={{ color: "#1b1b19" }}
            >
              Previous
            </span>
            <span className="mx-4 text-sm uppercase tracking-wider" style={{ color: "#1b1b19" }}>
              Page {currentPage} of {totalPages}
            </span>
            <span
              className={`mx-2 cursor-pointer ${currentPage === totalPages ? "opacity-50" : "hover:underline"}`}
              onClick={() => currentPage < totalPages && handlePageChange(Math.min(totalPages, currentPage + 1))}
              style={{ color: "#1b1b19" }}
            >
              Next
            </span>
          </div>
          <div className="flex mt-3">
            {[...Array(totalPages)].map((_, i) => (
              <span
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`mx-1 cursor-pointer text-xs ${currentPage === i + 1 ? "font-bold" : "hover:underline"}`}
                style={{ color: "#1b1b19" }}
                aria-label={`Page ${i + 1}`}
                aria-current={currentPage === i + 1 ? "page" : undefined}
              >
                {i + 1}
              </span>
            ))}
          </div>
          <div
            className="w-full max-w-xs border-t border-opacity-30 pt-2 mt-2"
            style={{ borderColor: "#1b1b19" }}
          ></div>
        </div>
      </div>
    </div>
  )
}
