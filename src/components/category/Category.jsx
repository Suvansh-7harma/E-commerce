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
    <div className="py-6 bg-gray-100 overflow-hidden">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-6">
        Shop by Category
      </h2>
      <div className="relative group">
        {/* Scrolling container */}
        <div className="flex gap-6 animate-scroll group-hover:animate-pause">
          {[...category, ...category, ...category].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigate(`/category/${item.name}`)}
            >
              {/* Animated box around each category */}
              <div className="relative w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-gray-200 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <div className="absolute inset-0 border-2 border-gray-300 rounded-full animate-box"></div>
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

      {/* Styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* Scrolling Animation */
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }

          /* Pause Animation on Hover */
          .group-hover .animate-scroll {
            animation-play-state: paused;
          }

          /* Scrolling Keyframes */
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          /* Animated Box Effect */
          .animate-box {
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 1; }
          }
        `,
        }}
      />
    </div>
  );
};

export default Category;
