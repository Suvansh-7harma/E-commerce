import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const ProductInfo = () => {
  const { loading, setLoading } = useContext(myContext);
  const [product, setProduct] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // Fetch product data
  const getProductData = async () => {
    setLoading(true);
    try {
      const productSnapshot = await getDoc(doc(fireDB, "products", id));
      setProduct({ ...productSnapshot.data(), id: productSnapshot.id });
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add to cart handler
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  // Remove from cart handler
  const handleRemoveFromCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart");
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 py-20">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        product && (
          <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-wrap lg:flex-nowrap">
              {/* Product Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative group overflow-hidden">
                  <img
                    className="w-full h-96 lg:h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
                    src={product.productImageUrl}
                    alt={product.title || "Product Image"}
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="w-full lg:w-1/2 p-8 lg:p-12">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                  {product.title}
                </h2>

                {/* Product Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="currentColor"
                      className={`mr-1 ${
                        index < 4 ? "text-yellow-500" : "text-gray-300"
                      }`}
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                    </svg>
                  ))}
                </div>

                <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  ₹{product.price}
                </p>

                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Description:
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {product.description}
                </p>

                {/* Add to Cart Button */}
                <div>
                  {cartItems.some((item) => item.id === product.id) ? (
                    <button
                      onClick={() => handleRemoveFromCart(product)}
                      className="w-full py-3 px-6 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                    >
                      Remove from Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-3 px-6 text-gray-800 bg-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProductInfo;
