import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const context = useContext(myContext);
  const { getAllProduct } = context;
  // Search State
  const [search, setSearch] = useState("");

  // Filter Search Data
  const filterSearchData = getAllProduct
    .filter((obj) => obj.title.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 8);

  const navigate = useNavigate();

  return (
    <div className="">
      {/* search input  */}
      <div className="input flex justify-center">
        <input
          type="text"
          placeholder="Search here"
          onChange={(e) => setSearch(e.target.value)}
          className=" bg-gray-200 placeholder-gray-400 rounded-lg px-2 py-2 w-96 lg:w-96 md:w-96 outline-none text-black "
        />
      </div>

      {/* search drop-down  */}
      <div className=" flex justify-center">
        {search && (
          <div className="block absolute bg-gray-200 w-96 md:w-96 lg:w-96 z-50 my-1 rounded-lg px-2 py-2">
            {filterSearchData.length > 0 ? (
              <>
                {filterSearchData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="py-2 px-2 cursor-pointer"
                      onClick={() => navigate(`/productinfo/${item.id}`)}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          className="w-10"
                          src={item.productImageUrl}
                          alt=""
                        />
                        {item.title}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <img
                    className=" w-20"
                    src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                    alt="img"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
// return (
//   <div className="relative w-full lg:w-auto">
//     {/* Search input */}
//     <div className="flex justify-center lg:justify-end">
//       <input
//         type="text"
//         placeholder="Search here..."
//         onChange={(e) => setSearch(e.target.value)}
//         className="bg-gray-200 placeholder-gray-500 rounded-full px-4 py-2 w-full lg:w-80 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-300"
//       />
//     </div>

//     {/* Search drop-down */}
//     {search && (
//       <div className="absolute bg-gray-200 w-full lg:w-80 z-50 my-2 rounded-lg shadow-lg">
//         {filterSearchData.length > 0 ? (
//           filterSearchData.map((item, index) => (
//             <div
//               key={index}
//               className="py-2 px-4 hover:bg-gray-300 cursor-pointer transition-colors duration-200"
//               onClick={() => navigate(`/productinfo/${item.id}`)}
//             >
//               <div className="flex items-center gap-3">
//                 <img className="w-8 h-8 rounded-full" src={item.productImageUrl} alt="" />
//                 <span className="text-gray-700 font-medium">{item.title}</span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="flex justify-center py-3">
//             <img
//               className="w-16"
//               src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
//               alt="No results"
//             />
//           </div>
//         )}
//       </div>
//     )}
//   </div>
// );



export default SearchBar;
