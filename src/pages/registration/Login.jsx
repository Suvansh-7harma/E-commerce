/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // User Login State
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  /**========================================================================
   *                          User Login Function
   *========================================================================**/

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    // Email Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!userLogin.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(userLogin.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password Validation
    if (!userLogin.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (userLogin.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const userLoginFunction = async () => {
    // Validate form fields
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );

      try {
        const q = query(
          collection(fireDB, "user"),
          where("uid", "==", users?.user?.uid)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));
          setUserLogin({
            email: "",
            password: "",
          });
          toast.success("Login Successfully");
          setLoading(false);
          if (user.role === "user") {
            navigate("/user-dashboard");
          } else {
            navigate("/admin-dashboard");
          }
        });
        return () => data;
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {loading && <Loader />}
      {/* Login Form  */}
      <div className="bg-white px-8 py-6 border border-gray-300 rounded-xl shadow-md w-full max-w-sm">
        {/* Top Heading  */}
        <div className="mb-5 text-center">
          <h2 className="text-2xl font-bold text-gray-700">Login</h2>
        </div>

        {/* Email Input  */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={userLogin.email}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
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
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={userLogin.password}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                password: e.target.value,
              });
            }}
            className="bg-gray-50 border border-gray-300 px-4 py-2 w-full rounded-md outline-none placeholder-gray-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Login Button  */}
        <div className="mb-5">
          <button
            type="button"
            onClick={userLoginFunction}
            className="bg-gray-500 hover:bg-gray-600 w-full text-white py-2 font-bold rounded-md"
          >
            Login
          </button>
        </div>

        {/* Sign Up Link  */}
        <div className="text-center">
          <h2 className="text-gray-700">
            Don't have an account?{" "}
            <Link className="text-gray-500 font-bold" to="/signup">
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
