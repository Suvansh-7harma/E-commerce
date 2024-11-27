/* eslint-disable react/prop-types */
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const BuyNowModal = ({ addressInfo, setAddressInfo, cart }) => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleOpen = () => setOpen(!open);

  const validateForm = () => {
    const newErrors = {};
    if (!addressInfo.name) newErrors.name = "Name is required.";
    if (!addressInfo.address) newErrors.address = "Address is required.";
    if (!addressInfo.pincode) newErrors.pincode = "Pincode is required.";
    if (!addressInfo.mobileNumber)
      newErrors.mobileNumber = "Mobile number is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    const stripe = await loadStripe("your-publishable-key"); // Replace with your Stripe publishable key

    const response = await fetch(
      "https://your-cloud-function-url/createCheckoutSession", // Replace with your cloud function URL
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }), // Pass the cart data
      }
    );

    const session = await response.json();

    if (session.id) {
      stripe.redirectToCheckout({ sessionId: session.id });
    } else {
      alert("Payment session could not be created.");
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleOpen(); // Close modal
      handleCheckout(); // Proceed to Stripe Checkout
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        className="w-full px-4 py-3 text-center text-gray-100 bg-gray-600 border border-transparent hover:border-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl"
      >
        Buy now
      </Button>
      <Dialog open={open} handler={handleOpen} className="bg-gray-50">
        <DialogBody>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                id="name"
                value={addressInfo.name}
                onChange={(e) =>
                  setAddressInfo({ ...addressInfo, name: e.target.value })
                }
                placeholder="Enter your name"
                aria-label="Name"
                className={`bg-gray-50 border px-2 py-2 w-full rounded-md outline-none text-gray-600 ${
                  errors.name ? "border-red-500" : "border-gray-400"
                }`}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                id="address"
                value={addressInfo.address}
                onChange={(e) =>
                  setAddressInfo({ ...addressInfo, address: e.target.value })
                }
                placeholder="Enter your address"
                aria-label="Address"
                className={`bg-gray-50 border px-2 py-2 w-full rounded-md outline-none text-gray-600 ${
                  errors.address ? "border-red-500" : "border-gray-400"
                }`}
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div>
              <input
                type="number"
                id="pincode"
                value={addressInfo.pincode}
                onChange={(e) =>
                  setAddressInfo({ ...addressInfo, pincode: e.target.value })
                }
                placeholder="Enter your pincode"
                aria-label="Pincode"
                className={`bg-gray-50 border px-2 py-2 w-full rounded-md outline-none text-gray-600 ${
                  errors.pincode ? "border-red-500" : "border-gray-400"
                }`}
              />
              {errors.pincode && (
                <p className="text-sm text-red-500">{errors.pincode}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                id="mobileNumber"
                value={addressInfo.mobileNumber}
                onChange={(e) =>
                  setAddressInfo({
                    ...addressInfo,
                    mobileNumber: e.target.value,
                  })
                }
                placeholder="Enter your mobile number"
                aria-label="Mobile Number"
                className={`bg-gray-50 border px-2 py-2 w-full rounded-md outline-none text-gray-600 ${
                  errors.mobileNumber ? "border-red-500" : "border-gray-400"
                }`}
              />
              {errors.mobileNumber && (
                <p className="text-sm text-red-500">{errors.mobileNumber}</p>
              )}
            </div>

            <div>
              <Button
                type="button"
                onClick={handleSubmit}
                className="w-full px-4 py-3 text-center text-gray-100 bg-gray-600 border border-transparent rounded-lg hover:bg-gray-700"
              >
                Proceed to Pay
              </Button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default BuyNowModal;
