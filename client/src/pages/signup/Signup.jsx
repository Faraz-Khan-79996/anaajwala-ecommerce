import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../features/user/userSlice.js";
import axios from "axios";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import OAuthSignup from "../../components/OAuthSignup.jsx";
import { useSearchParams } from "react-router-dom";


const Signup = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // console.log(searchParams.get("referralGiver"));
  
  useEffect(()=>{
    if(user.user){
      navigate('/')
    }
  } , [user])

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    data.username = data.username.toLowerCase()
    // console.log(data);
    setLoading((prev) => true);

    try {
      const { data: user } = await axios.post("/api/auth/signup", data , {params : {referralGiver : searchParams.get("referralGiver")}});
      dispatch(addUser(user));
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    } finally {
      setLoading((prev) => false);
    }
  };

  return (
    <>
      <section className="py-4 md:py-8 dark:bg-gray-800">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {error ? (
          <>
            <Alert onDismiss={() => setError(null)} className="mb-4" color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Error!</span> {error}
            </Alert>
          </>
        ) : null}
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://www.svgrepo.com/show/335276/oldelectrum-logo.svg"
              alt="osher.ai logo"
            />
            Anaaj wala
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create your account
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>

                <OAuthSignup />
                
              </form>
              <div className="flex items-center">
                <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
                {/* <div className="px-5 text-center text-gray-500 dark:text-gray-400">
                  or
                </div> */}
                <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className={`bg-gray-50 border ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="eg. John Wick"
                    {...register("username", {
                      required: "Username is required",
                    })}
                  />
                  {errors.username && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone_no"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact number
                  </label>
                  <input
                    type="text"
                    name="phone_no"
                    id="phone_no"
                    className={`bg-gray-50 border ${
                      errors.phone_no ? "border-red-500" : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder=""
                    {...register("phone_no", {
                      required: "Contact number is required",
                      maxLength: {
                        value: 10,
                        message: "Contact number cannot exceed 10 characters",
                      },
                      minLength: {
                        value: 10,
                        message:
                          "Contact number must be at least 10 characters",
                      },
                    })}
                  />
                  {errors.phone_no && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {errors.phone_no.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="confirm_phone_no"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Contact number
                  </label>
                  <input
                    type="text"
                    name="confirm_phone_no"
                    id="confirm_phone_no"
                    className={`bg-gray-50 border ${
                      errors.phone_no ? "border-red-500" : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="confirm you contact number"
                    {...register("confirm_phone_no", {
                      required: "Please confirm your contact number",
                      validate: (value) =>
                        value === getValues("phone_no") ||
                        "Contact Number do not match.",
                    })}
                  />
                  {errors.confirm_phone_no && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {errors.confirm_phone_no.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`bg-gray-50 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="email@gmail.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className={`bg-gray-50 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className={`bg-gray-50 border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                >
                  Create your account{" "}
                  {loading ? (
                    <Spinner
                      className="ml-2"
                      aria-label="Default status example"
                    />
                  ) : null}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-teal-600 hover:underline dark:text-teal-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
