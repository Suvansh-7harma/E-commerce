import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font bg-gray-800">
      {/* Container */}
      <div className="container px-5 py-10 mx-auto flex items-center sm:flex-row flex-col">
        {/* Logo */}
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <span className="text-xl font-bold">E-Cart</span>
        </a>

        {/* Footer Text */}
        <p className="text-sm text-gray-300 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2024 eCart —
          <Link
            to={"/"}
            className="text-gray-100 ml-1 hover:text-gray-500 transition-colors duration-300"
            rel="noopener noreferrer"
            target="_blank"
          >
            @E-cart
          </Link>
        </p>

        {/* Social Media Icons */}
        <div className="sm:ml-auto sm:mt-0 mt-4 flex justify-center sm:justify-start space-x-4">
          {/* Facebook */}
          <a className="text-gray-100 hover:text-gray-400 transition-colors duration-300 cursor-pointer">
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>

          {/* Twitter */}
          <a className="text-gray-100 hover:text-gray-400 transition-colors duration-300 cursor-pointer">
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>

          {/* Instagram */}
          <a className="text-gray-100 hover:text-gray-400 transition-colors duration-300 cursor-pointer">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a className="text-gray-100 hover:text-gray-400 transition-colors duration-300 cursor-pointer">
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={0}
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              />
              <circle cx={4} cy={4} r={2} stroke="none" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
