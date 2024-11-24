/* eslint-disable react/no-unescaped-entities */

const Testimonial = () => {
  return (
    <div>
      <section className="text-gray-600 body-font mb-10">
        {/* Container */}
        <div className="container px-5 py-10 mx-auto">
          {/* Heading */}
          <h1 className="text-center text-3xl font-bold text-black mb-4">
            Reviews
          </h1>
          {/* Subheading */}
          <h2 className="text-center text-2xl font-semibold mb-10 text-gray-600">
            What our <span className="text-gray-500">customers</span> are saying
          </h2>

          <div className="flex flex-wrap justify-center -m-4">
            {/* Testimonial 1 */}
            <div className="lg:w-1/3 sm:w-1/2 p-4">
              <div className="h-full bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
                <div className="flex justify-center mb-6">
                  <img
                    alt="testimonial"
                    className="w-20 h-20 object-cover rounded-full border-2 border-gray-200"
                    src="https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?t=st=1717352009~exp=1717355609~hmac=cbae2701b2e2496db1a6fd70d837a359f281622af7fd1f10f2914a6fb4ad07bd&w=740"
                  />
                </div>
                <p className="leading-relaxed text-gray-700 mb-4">
                  Edison bulb retro cloud bread echo park, helvetica stumptown
                  taiyaki taxidermy 90's cronut +1 kinfolk.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-gray-500 mt-4 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                  Suvansh Sharma
                </h2>
                <p className="text-gray-500">Web Developer</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="lg:w-1/3 sm:w-1/2 p-4">
              <div className="h-full bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
                <div className="flex justify-center mb-6">
                  <img
                    alt="testimonial"
                    className="w-20 h-20 object-cover rounded-full border-2 border-gray-200"
                    src="https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?t=st=1717352009~exp=1717355609~hmac=cbae2701b2e2496db1a6fd70d837a359f281622af7fd1f10f2914a6fb4ad07bd&w=740"
                  />
                </div>
                <p className="leading-relaxed text-gray-700 mb-4">
                  Polaroid artisan prism kombucha vinyl, Helvetica migas man bun
                  churros taxidermy 80's ugh salvia.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-gray-500 mt-4 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                  Rohan Singh
                </h2>
                <p className="text-gray-500">Lives in USA</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="lg:w-1/3 sm:w-1/2 p-4">
              <div className="h-full bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
                <div className="flex justify-center mb-6">
                  <img
                    alt="testimonial"
                    className="w-20 h-20 object-cover rounded-full border-2 border-gray-200"
                    src="https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?t=st=1717352009~exp=1717355609~hmac=cbae2701b2e2496db1a6fd70d837a359f281622af7fd1f10f2914a6fb4ad07bd&w=740"
                  />
                </div>
                <p className="leading-relaxed text-gray-700 mb-4">
                  Vinyl tumeric poke aesthetic biodiesel, chambray kale chips
                  glossier VHS normcore air plant.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-gray-500 mt-4 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                  Bhola
                </h2>
                <p className="text-gray-500">Traveller</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
