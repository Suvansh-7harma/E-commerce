import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ getAllProduct }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filterSearchData = Array.isArray(getAllProduct)
    ? getAllProduct.filter((obj) =>
        obj.title?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="relative">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search here"
        onChange={(e) => setSearch(e.target.value)}
        className="bg-gray-200 placeholder-gray-400 rounded-lg px-2 py-2 w-96"
      />
      {/* Dropdown for Search Results */}
      {search && (
        <div className="absolute bg-gray-200 w-full rounded-lg mt-1 shadow-lg">
          {filterSearchData.length > 0 ? (
            filterSearchData.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer py-2 px-4 hover:bg-gray-300"
                onClick={() => navigate(`/productinfo/${item.id}`)}
              >
                {item.title}
              </div>
            ))
          ) : (
            <div className="py-2 px-4 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
