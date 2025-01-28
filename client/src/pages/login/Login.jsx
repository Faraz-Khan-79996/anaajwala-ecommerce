import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, clearUser, addUser } from "../../features/user/userSlice";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import OAuth from "../../components/OAuth";
import OTPInput from "otp-input-react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase.js"; // Ensure you configure Firebase auth in a separate file
import { toast, Toaster } from "react-hot-toast"; // Import toast
import axios from "axios";
function Login() {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize useForm hook
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.user) {
      navigate("/");
    }
  }, [user]);

  const generateOtp = async () => {
    try {
      console.log(`+91${getValues("phone_no")}`);

      const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+91${getValues("phone_no")}`,
        recaptchaVerifier
      );
      setVerificationResult(confirmationResult);
      toast.success("OTP sent successfully", { duration: 4000 });

      setOtpSent(true); // Show OTP input after OTP is sent // Show success toast
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError(error.message);
      toast.error("Error sending OTP"); // Show error toast
    }
  };
  async function handleGenerateOtp() {
    setLoading(() => true);
    try {
      const { data } = await axios.get(
        `/api/auth/duplicate-phone/${getValues("phone_no").trim()}`
      );

      if (!data.isPhoneNumberDuplicate) {
        return setError(data.message);
      }
      await generateOtp();
    } catch (error) {
      setError("Error processing your phone number");
      return;
    } finally {
      setLoading(() => false);
    }
  }

  const login = async () => {
    setLoading(true); // Show loader
    try {
      const userCredential = await verificationResult.confirm(otp);
      const idToken = await userCredential.user.getIdToken();

      const { data } = await axios.post(`/api/auth/signin`, {
        idToken,
      });

      // console.log(user);
      dispatch(addUser(data.user));
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("OTP INCORRECT!");
      toast.error("OTP incorrect!"); // Show error toast
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="dark:bg-gray-800 min-h-screen font-fredoka">
        <div className="flex flex-col items-center justify-center px-4 py-8 mx-auto min-h-screen">
          {error && (
            <Alert
              onDismiss={() => setError("")}
              className="mb-4 w-full max-w-sm md:max-w-md"
              color="failure"
              icon={HiInformationCircle}
            >
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
            Anaj wala
          </Link>
          <div className="max-w-md w-full bg-white shadow-lg dark:border dark:bg-gray-800 rounded-3xl md:max-w-3xl lg:max-w-[120vh] shadow-gray-400 flex h-[70vh]">
            <div className="hidden md:block md:w-1/2 bg-cover bg-[url('./assets/farm.webp')] rounded-l-3xl"></div>
            <div className="w-full md:w-1/2 p-6 space-y-4 sm:space-y-6 sm:p-8 flex flex-col justify-center items-center bg-white dark:bg-gray-800 rounded-3xl">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Sign in to your account
              </h1>
              <OAuth />
              <div className="w-full flex items-center">
                <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                <div className="px-5 text-center text-gray-500 dark:text-gray-400">
                  or
                </div>
                <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="w-full flex flex-col items-center space-y-4">
                <div className="w-full">
                  <input
                    placeholder="Enter your phone number"
                    type="text"
                    name="phone_no"
                    id="phone_no"
                    className={`bg-gray-50 border ${
                      errors.phone_no ? "border-red-500" : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                    {...register("phone_no", {
                      required: "Contact number is required",
                      maxLength: {
                        value: 10,
                        message: "Cannot exceed 10 characters",
                      },
                      minLength: {
                        value: 10,
                        message: "Must be at least 10 characters",
                      },
                    })}
                  />
                  {errors.phone_no && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {errors.phone_no.message}
                    </p>
                  )}
                </div>
                {!otpSent && <div id="recaptcha"></div>}
                {otpSent && (
                  <OTPInput
                    className="otp-container"
                    value={otp}
                    onChange={setOtp}
                    autoFocus
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                  />
                )}
                <div className="flex flex-wrap items-center justify-between w-full">
                  <div className="flex items-start">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-teal-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-teal-600"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 text-sm text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-teal-600 hover:underline dark:text-teal-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                {otpSent ? (
                  <button className="w-full py-2 px-4 text-white bg-teal-600 rounded-lg font-bold">
                    Login
                    {loading && <Spinner className="ml-2" />}
                  </button>
                ) : (
                  <button
                    onClick={handleGenerateOtp}
                    className="w-full py-2 px-4 text-white bg-teal-600 rounded-lg font-bold"
                  >
                    Send OTP
                    {loading && <Spinner className="ml-2" />}
                  </button>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-teal-600 hover:underline dark:text-teal-500"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
