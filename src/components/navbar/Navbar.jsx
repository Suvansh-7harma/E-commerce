import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  // State to toggle the mobile menu and search bar visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Fetch user from localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  // Navigate hook
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.clear("users");
    navigate("/login");
  };

  // Get cart items from Redux
  const cartItems = useSelector((state) => state.cart);

  // Navigation items
  const navList = (
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
  );

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
            {/* Hamburger Icon */}
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

          {/* Search Icon (Mobile) */}
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

        {/* Navigation Menu (Desktop) */}
        <div className="hidden lg:block">{navList}</div>

        {/* Search Bar (Desktop) */}
        <div className="mt-4 lg:mt-0 hidden lg:block">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-lg text-gray-800 w-72"
          />
        </div>
      </div>

      {/* Mobile Menu (Hamburger) */}
      <div
        className={`lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-gray-700 py-4`}
      >
        {navList}
      </div>

      {/* Mobile Search Bar */}
      <div
        className={`lg:hidden ${
          isSearchOpen ? "block" : "hidden"
        } bg-gray-700 py-4 px-6`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-lg text-gray-800"
        />
      </div>
    </nav>
  );
};

export default Navbar;
