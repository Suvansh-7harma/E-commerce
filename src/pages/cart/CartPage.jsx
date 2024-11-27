import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  deleteFromCart,
} from "../../redux/cartSlice";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { loadStripe } from "@stripe/stripe-js";


const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
  });

  const buyNowFunction = () => {
    // Mock buy now functionality
    console.log("Purchase Successful!", { addressInfo, cart });
    setAddressInfo({ name: "", address: "", pincode: "", mobileNumber: "" }); // Reset form
  };

  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const handleCheckout = async () => {
    // Load Stripe with your publishable key
    const stripe = await loadStripe("your-publishable-key"); // Replace with your actual key

    try {
      // Make a request to your Firebase Cloud Function
      const response = await fetch(
        "https://your-cloud-function-url/createCheckoutSession",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart }), // Ensure cart data is in the expected format
        }
      );

      const session = await response.json();

      if (session.id) {
        // Redirect to Stripe Checkout
        await stripe.redirectToCheckout({ sessionId: session.id });
      } else {
        alert("Payment session could not be created.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Handle decrementing the quantity, ensuring it doesn't go below 1
  const handleDecrement = (itemId, quantity) => {
    if (quantity > 1) {
      dispatch(decrementQuantity(itemId));
    } else {
      // Optionally show a message if needed
      console.log("Quantity cannot go below 1");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>

      {/* If the cart is empty */}
      {cart.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          Your cart is empty.
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cart Items */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b py-4 px-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-200"
            >
              {/* Product Image */}
              <img
                src={item.productImageUrl} // Assuming each item has an image URL
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md sm:mr-6"
              />
              {/* Product Details */}
              <div className="sm:flex-1 text-center sm:text-left">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex space-x-2 mt-4 sm:mt-0 sm:flex-col sm:space-x-0 sm:space-y-2">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-all"
                  onClick={() => handleDecrement(item.id, item.quantity)}
                >
                  -
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-all"
                  onClick={() => dispatch(incrementQuantity(item.id))}
                >
                  +
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                  onClick={() => dispatch(deleteFromCart({ id: item.id }))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {/* Total and Buy Now */}
          <div className="flex justify-between items-center mt-6 bg-gray-100 py-4 px-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">
              Total: ₹{total.toFixed(2)}
            </h2>
            <BuyNowModal
              addressInfo={addressInfo}
              setAddressInfo={setAddressInfo}
              buyNowFunction={buyNowFunction}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
