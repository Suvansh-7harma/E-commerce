import { useNavigate } from "react-router";

const category = [
  {
    image: "https://cdn-icons-png.flaticon.com/256/4359/4359963.png",
    name: "fashion",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/11833/11833323.png",
    name: "shirt",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/8174/8174424.png",
    name: "jacket",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/7648/7648246.png",
    name: "mobile",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/12142/12142416.png",
    name: "laptop",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/10686/10686553.png",
    name: "shoes",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/12114/12114279.png",
    name: "home",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/11946/11946316.png",
    name: "books",
  },
];

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="py-6 bg-gray-100">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-6">
        Shop by Category
      </h2>
      <div className="flex overflow-x-scroll lg:justify-center hide-scroll-bar">
        <div className="flex gap-6">
          {category.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigate(`/category/${item.name}`)}
            >
              {/* Category Image */}
              <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-gray-200 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 lg:w-16 lg:h-16"
                />
              </div>

              {/* Category Name */}
              <h3 className="text-sm lg:text-lg text-gray-700 font-medium mt-3 capitalize">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Hide Scrollbar Styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .hide-scroll-bar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scroll-bar::-webkit-scrollbar {
            display: none;
          }
        `,
        }}
      />
    </div>
  );
};

export default Category;
