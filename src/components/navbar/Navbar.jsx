import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";

const Navbar = () => {
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
    <ul className="flex space-x-6 text-white font-semibold text-md px-5">
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

        {/* Navigation Menu */}
        <div className="hidden lg:block">{navList}</div>

        {/* Search Bar */}
        <div className="mt-4 lg:mt-0">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="lg:hidden flex justify-center bg-gray-700 py-3">
        {navList}
      </div>
    </nav>
  );
};

export default Navbar;
