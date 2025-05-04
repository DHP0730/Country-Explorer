import React from 'react';

function SearchBar({ onSearch }) {
  return (
    <div className="relative w-full md:w-1/2">
      <input
        type="text"
        placeholder="Search by country name..."
        className="w-full pl-10 pr-4 py-2 border rounded"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
      </div>
    </div>
  )
}

export default SearchBar
  