import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../searchBar/SearchBar";
import myContext from "../../context/myContext";

const Navbar = () => {
  const context = useContext(myContext);
  const { getAllProduct } = context;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart);
  const user = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("users");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 fixed top-0 w-full z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Brand Logo */}
        <div className="text-center">
          <Link to="/">
            <h1 className="text-3xl font-extrabold text-white">E-Cart</h1>
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="lg:hidden flex items-center space-x-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 18l6-6M18 10a8 8 0 11-8-8 8 8 0 018 8z"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="hidden lg:block">
          <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 text-white font-semibold text-md px-5">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/allproduct">All Products</Link>
            </li>
            {!user ? (
              <>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                {user?.role === "user" && (
                  <li>
                    <Link to="/user-dashboard">Dashboard</Link>
                  </li>
                )}
                {user?.role === "admin" && (
                  <li>
                    <Link to="/admin-dashboard">Admin Panel</Link>
                  </li>
                )}
                <li className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </li>
              </>
            )}
            <li>
              <Link to="/cart">Cart ({cartItems.length})</Link>
            </li>
          </ul>
        </div>

        {/* SearchBar Component */}
        <div className="hidden lg:block">
          <SearchBar getAllProduct={getAllProduct} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-gray-700 py-4`}
      >
        <ul className="text-white px-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/allproduct">All Products</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Search */}
      <div
        className={`lg:hidden ${
          isSearchOpen ? "block" : "hidden"
        } bg-gray-700 py-4 px-6`}
      >
        <SearchBar getAllProduct={getAllProduct} />
      </div>
    </nav>
  );
};

export default Navbar;
