import "animate.css";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen bg-gray-900">
      <img
        className="w-full h-full object-cover"
        src="https://img.freepik.com/free-photo/top-view-laptop-with-light-box-plant-cyber-monday_23-2148657662.jpg?t=st=1717349942~exp=1717353542~hmac=841e81920341a784a2d21723aa1f80edb545f4151c7a12f5084d508a6bd1d856&w=996"
        alt="Hero Background"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-white text-4xl lg:text-6xl font-bold mb-4 animate__animated animate__fadeInDown animate__delay-1s">
            Welcome to E-Cart
          </h1>
          <p className="text-gray-300 text-lg lg:text-xl mb-6 animate__animated animate__fadeInUp animate__delay-2s">
            Your one-stop shop for all your favorite products.
          </p>
          {/* Uncomment this button to include a call to action */}
          {/* <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg text-lg animate__animated animate__fadeInUp animate__delay-3s"
          >
            Shop Now
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
