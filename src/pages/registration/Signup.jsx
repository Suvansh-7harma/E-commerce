/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // User Signup State
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  /**========================================================================
   *                          User Signup Function
   *========================================================================**/

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
    };

    // Name Validation
    if (!userSignup.name) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (userSignup.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
      isValid = false;
    }

    // Email Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!userSignup.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(userSignup.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password Validation
    if (!userSignup.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (userSignup.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const userSignupFunction = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );
      const user = userCredential.user;

      const userData = {
        name: userSignup.name,
        email: user.email, // Retrieve email directly from the user object
        uid: user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const userReference = collection(fireDB, "user");
      await addDoc(userReference, userData);

      setUserSignup({
        name: "",
        email: "",
        password: "",
      });

      toast.success("Signup Successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log("Signup Error: ", error);
      toast.error("Signup Failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {loading && <Loader />}
      {/* Signup Form  */}
      <div className="bg-white px-8 py-6 border border-gray-300 rounded-xl shadow-md w-full max-w-sm">
        {/* Top Heading  */}
        <div className="mb-5 text-center">
          <h2 className="text-2xl font-bold text-gray-700">Signup</h2>
        </div>

        {/* Name Input  */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Full Name"
            value={userSignup.name}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                name: e.target.value,
              });
            }}
            className="bg-gray-50 border border-gray-300 px-4 py-2 w-full rounded-md outline-none placeholder-gray-400"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email Input  */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email Address"
            value={userSignup.email}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                email: e.target.value,
              });
            }}
            className="bg-gray-50 border border-gray-300 px-4 py-2 w-full rounded-md outline-none placeholder-gray-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password Input  */}
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            value={userSignup.password}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                password: e.target.value,
              });
            }}
            className="bg-gray-50 border border-gray-300 px-4 py-2 w-full rounded-md outline-none placeholder-gray-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Signup Button  */}
        <div className="mb-5">
          <button
            type="button"
            onClick={userSignupFunction}
            className="bg-gray-500 hover:bg-gray-600 w-full text-white py-2 font-bold rounded-md"
          >
            Signup
          </button>
        </div>

        {/* Login Link  */}
        <div className="text-center">
          <h2 className="text-gray-700">
            Already have an account?{" "}
            <Link className="text-gray-500 font-bold" to="/login">
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
