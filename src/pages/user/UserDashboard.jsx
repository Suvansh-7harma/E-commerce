import React, { createContext, useContext } from "react";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";

// Create User Context
export const UserContext = createContext();

const UserDashboard = () => {
  // Get user details from localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  // Context for loading and orders (assume this is populated by some API call)
  const context = useContext(myContext);
  const { loading, getAllOrder } = context;

  return (
    <UserContext.Provider value={user}>
      <Layout>
        {/* Hero Section or Other Components can consume the context */}
        <div className="container mx-auto px-4 py-5 lg:py-8">
          {/* User Information Section */}
          <div className="bg-gray-50 py-5 rounded-xl border border-gray-100">
            {/* User Avatar */}
            <div className="flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                alt="User Avatar"
                className="rounded-full w-24 h-24 border-2 border-gray-200"
              />
            </div>
            {/* User Details */}
            <div className="mt-4 text-center">
              <h1 className="text-lg">
                <span className="font-bold">Name:</span> {user?.name || "N/A"}
              </h1>
              <h1 className="text-lg">
                <span className="font-bold">Email:</span> {user?.email || "N/A"}
              </h1>
              <h1 className="text-lg">
                <span className="font-bold">Date:</span> {user?.date || "N/A"}
              </h1>
              <h1 className="text-lg">
                <span className="font-bold">Role:</span> {user?.role || "N/A"}
              </h1>
            </div>
          </div>

          {/* Orders Section */}
          <div className="mt-8">
            <h2 className="text-2xl lg:text-3xl font-bold">Order Details</h2>
            {loading && (
              <div className="flex justify-center mt-5">
                <Loader />
              </div>
            )}
            <div className="mt-5">
              {getAllOrder
                .filter((order) => order.userid === user?.uid)
                .map((order, index) => (
                  <div
                    key={index}
                    className="border rounded-lg mb-4 p-5 shadow-md"
                  >
                    {/* Order Metadata */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm font-semibold">Order ID</p>
                        <p className="text-sm text-gray-700">#{order.id}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Date</p>
                        <p className="text-sm text-gray-700">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Status</p>
                        <p
                          className={`text-sm ${
                            order.status === "delivered"
                              ? "text-green-600"
                              : "text-gray-700"
                          }`}
                        >
                          {order.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Total Amount</p>
                        <p className="text-sm text-gray-700">
                          ₹
                          {order.cartItems.reduce(
                            (sum, item) => sum + item.price * item.quantity,
                            0
                          )}
                        </p>
                      </div>
                    </div>
                    {/* Order Items */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {order.cartItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center border rounded-lg p-3"
                        >
                          <img
                            src={item.productImageUrl}
                            alt={item.title}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="ml-4">
                            <h3 className="font-semibold text-lg">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {item.category}
                            </p>
                            <p className="text-sm text-gray-800">
                              x {item.quantity}
                            </p>
                            <p className="text-sm text-gray-900 font-bold">
                              ₹{item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Layout>
    </UserContext.Provider>
  );
};

export default UserDashboard;
