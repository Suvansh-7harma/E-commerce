import "animate.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react"; // Import useContext
import { UserContext } from "../../pages/user/UserDashboard"; // Import UserContext

const HeroSection = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext); // Access user data from context

  // Navigate to All Products page
  const handleRedirect = () => {
    navigate("../pages/allProduct/AllProduct");
  };

  return (
    <section className="relative w-full h-screen bg-gray-900">
      <img
        className="w-full h-full object-cover"
        src="https://img.freepik.com/free-photo/top-view-laptop-with-light-box-plant-cyber-monday_23-2148657662.jpg"
        alt="Hero Background"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center px-4">
          {/* Heading */}
          <h1 className="text-white text-5xl lg:text-7xl font-extrabold mb-6 animate__animated animate__fadeInDown animate__delay-1s text-gradient bg-clip-text">
            Welcome to E-Cart
          </h1>

          {/* Subheading */}
          <p className="text-gray-300 text-lg lg:text-xl mb-8 animate__animated animate__fadeInUp animate__delay-2s">
            Your one-stop shop for all your favorite products.
          </p>

          {/* Call to Action Button */}
          <button
            onClick={handleRedirect}
            className="bg-gray-700 hover:bg-gray-900 text-white py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105 focus:outline-none animate__animated animate__fadeInUp animate__delay-3s"
          >
            {user?.name ? `Shop Now, ${user.name}!` : "Shop Now"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
