"use client";
import { motion } from "framer-motion";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function Pagination({ currentPage, totalPages, onPageChange,className }) {
  const getPages = () => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    return range;
  };

  return (
    <motion.div
      className={className + " flex items-center justify-center gap-2 py-4"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >

      <button
        className="p-2 cursor-pointer  rounded-full bg-blue-100 group hover:bg-blue-200 transition overflow-hidden"
        disabled={currentPage === 1}
        
        aria-label="left-swipe"
        onClick={() => onPageChange(currentPage - 1)}
      >
  <FaAngleLeft className="transition ease duration-700 relative group-active:-left-1"/>
      </button>
        {/* {<span>No more {totalPages}</span>} */}
      {getPages().map((page) => (
        <motion.button
          key={page}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(page)}
          className={`px-4 cursor-pointer will-change-transform py-2 rounded-lg transition font-semibold ${
            currentPage === page
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {page}
        </motion.button>
      ))}

      <button
        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 group transition cursor-pointer "
        disabled={currentPage === totalPages}
         aria-label="right-swipe"
        onClick={() => onPageChange(currentPage + 1)}
      >
  <FaAngleRight className="transition ease duration-700 relative group-active:-right-1" />
      </button>
    </motion.div>
  );
}
