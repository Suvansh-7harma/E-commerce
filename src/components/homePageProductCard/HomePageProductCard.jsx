import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { motion } from "framer-motion";


const HomePageProductCard = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProduct } = context;

  const [pendingAction, setPendingAction] = useState(null); // Track pending add-to-cart actions
  const cartItems = useSelector((state) => state.cart);
  const isLoggedIn = Boolean(localStorage.getItem("users")); // Check login status
  const dispatch = useDispatch();

  const addCart = (item) => {
    if (isLoggedIn) {
      dispatch(addToCart(item));
      toast.success("Added to cart!");
    } else {
      setPendingAction(() => () => dispatch(addToCart(item))); // Save pending action
      toast.error("You need to log in to add items to the cart");
      navigate("/login"); // Redirect to login page
    }
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart!");
  };

  useEffect(() => {
    if (isLoggedIn && pendingAction) {
      pendingAction(); // Execute pending action if user logs in
      setPendingAction(null); // Clear pending action
    }
  }, [isLoggedIn, pendingAction]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="mt-10">
      {/* Section Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 animate-rotate">
          🖐 Bestselling Products 👇
        </h1>
        <style jsx>{`
          @keyframes rotate {
            0% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(5deg);
            }
            50% {
              transform: rotate(-5deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }
          .animate-rotate {
            display: inline-block;
            animation: rotate 3s infinite ease-in-out;
          }
        `}</style>
      </div>

      {/* Product Grid */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {getAllProduct.slice(0, 8).map((item, index) => {
              const { id, title, price, productImageUrl } = item;
              return (
                <div
                  key={index}
                  className="border border-gray-300 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  {/* Product Image */}
                  <img
                    onClick={() => navigate(`/productinfo/${id}`)}
                    className="h-60 w-full object-cover"
                    src={productImageUrl}
                    alt={title}
                  />

                  {/* Product Details */}
                  <div className="p-4">
                    <h2 className="text-sm font-medium text-gray-500 mb-2 uppercase">
                      E-Bharat
                    </h2>
                    <h1 className="text-lg font-semibold text-gray-800 mb-2">
                      {title.length > 25
                        ? `${title.substring(0, 22)}...`
                        : title}
                    </h1>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      ₹{price}
                    </h2>

                    {/* Add/Delete Button */}
                    <div className="flex justify-center">
                      {cartItems.some((p) => p.id === id) ? (
                        <button
                          onClick={() => deleteCart(item)}
                          className="bg-red-500 hover:bg-red-600 w-full text-white py-2 rounded-lg font-bold transition-all"
                        >
                          Remove from Cart
                        </button>
                      ) : (
                        <button
                          onClick={() => addCart(item)}
                          className="bg-gray-500 hover:bg-gray-600 w-full text-white py-2 rounded-lg font-bold transition-all"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageProductCard;
