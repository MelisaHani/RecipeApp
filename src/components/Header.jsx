import { useState } from 'react';

export default function Header({ onSearch }) {
  const [query, setQuery] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    onSearch(query);
    console.log(query);
  }
  return (
    <div>
      <div className=" px-4 py-6 flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Recipe Finder
        </h1>
        <form onSubmit={handleSubmit} className="flex w-full md:w-auto">
          <input
            className="p-2 border border-gray-300 rounded-l text-gray-500 sm:text-sm focus:outline-none focus:border-gray-500"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter ingredients..."
          />
          <button
            className="px-4 py-2 text-sm font-medium text-gray-100 bg-gray-800 rounded-r hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
