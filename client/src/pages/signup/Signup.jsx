import { useEffect, useState } from "react";
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

const Signup = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [otpLoading , setOtpLoading] = useState(false)
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user.user) {
      navigate("/");
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const sendOtp = async () => {
    const phone_no = getValues("phone_no");
    if (phone_no.length === 10) {
      try {
        setOtpLoading(true)
        await axios.post("/api/auth/sendOTP?action=signup", { phone_no });
        setOtpSent(true);
      } catch (err) {
        
        if(err.response && err.response.data){
          setError(err.response.data.message);
        }
        else{
          setError("Failed to send OTP. Please try again.");
        }
      }
      finally{
        setOtpLoading(false)
      }
    } else {
      setError("Please enter a valid 10-digit phone number.");
    }
  };

  const onSubmit = async (data) => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    data.username = data.username.toLowerCase();
    setLoading(true);
    try {
      const { data: user } = await axios.post("/api/auth/signup", { ...data, otp });
      dispatch(addUser(user));
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="py-4 md:py-8 dark:bg-gray-800">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {error && (
            <Alert onDismiss={() => setError(null)} className="mb-4" color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Error!</span> {error}
            </Alert>
          )}
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <OAuthSignup />

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
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters long",
                      },
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
                    placeholder="Enter phone number"
                    {...register("phone_no", {
                      required: "Phone number is required",
                      maxLength: {
                        value: 10,
                        message: "Phone number cannot exceed 10 characters",
                      },
                      minLength: {
                        value: 10,
                        message: "Phone number must be at least 10 characters",
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
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={otpLoading}
                    className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                  >
                    Generate OTP
                    {otpLoading && (
                    <Spinner
                      className="ml-2"
                      aria-label="Default status example"
                    />
                  )}
                  </button>
                </div>

                {otpSent && (
                  <div>
                    <label
                      htmlFor="otp"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      name="otp"
                      id="otp"
                      className={`bg-gray-50 border ${
                        !otp ? "border-red-500" : "border-gray-300"
                      } text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    {!otp && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        OTP is required
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                >
                  Create your account{" "}
                  {loading && (
                    <Spinner
                      className="ml-2"
                      aria-label="Default status example"
                    />
                  )}
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
