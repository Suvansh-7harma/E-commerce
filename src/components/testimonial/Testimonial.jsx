/* eslint-disable react/no-unescaped-entities */

const Testimonial = () => {
  return (
    <div>
      <section className="text-gray-600 body-font mb-10 overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          {/* Heading */}
          <h1 className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-500 to-gray-500 mb-8">
            Reviews
          </h1>

          {/* Subheading */}
          <h2 className="text-center text-2xl font-semibold mb-10 text-gray-600">
            What our <span className="text-gray-500">customers</span> are saying
          </h2>

          {/* Scrolling Container */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-full bg-white p-6 rounded-xl shadow-lg flex-shrink-0 w-80"
                >
                  <div className="flex justify-center mb-6">
                    <img
                      alt="testimonial"
                      className="w-20 h-20 object-cover rounded-full border-2 border-gray-200"
                      src="https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg"
                    />
                  </div>
                  <p className="leading-relaxed text-gray-700 mb-4">
                    {i % 3 === 0 &&
                      "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk."}
                    {i % 3 === 1 &&
                      "Polaroid artisan prism kombucha vinyl, Helvetica migas man bun churros taxidermy 80's ugh salvia."}
                    {i % 3 === 2 &&
                      "Vinyl tumeric poke aesthetic biodiesel, chambray kale chips glossier VHS normcore air plant."}
                  </p>
                  <span className="inline-block h-1 w-10 rounded bg-gray-500 mt-4 mb-4" />
                  <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                    {i % 3 === 0 && "Suvansh Sharma"}
                    {i % 3 === 1 && "Rohan Singh"}
                    {i % 3 === 2 && "Bhola"}
                  </h2>
                  <p className="text-gray-500">
                    {i % 3 === 0 && "Web Developer"}
                    {i % 3 === 1 && "Lives in USA"}
                    {i % 3 === 2 && "Traveller"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animation Styles */}
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          .animate-scroll {
            display: flex;
            animation: scroll 15s linear infinite;
          }
        `}</style>
      </section>
    </div>
  );
};

export default Testimonial;
