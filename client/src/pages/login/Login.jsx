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

            const recaptchaVerifier = new RecaptchaVerifier(
                auth,
                "recaptcha",
                {}
            );
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
            <section className="py-4 md:py-8 dark:bg-gray-800">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    {error ? (
                        <>
                            <Alert
                                onDismiss={() => setError("")}
                                className="mb-4"
                                color="failure"
                                icon={HiInformationCircle}
                            >
                                <span className="font-medium">Error!</span>{" "}
                                {error}
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
                                Sign in to your account
                            </h1>
                            <OAuth />
                            <div className="flex items-center">
                                <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
                                <div className="px-5 text-center text-gray-500 dark:text-gray-400">
                                    or
                                </div>
                                <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
                            </div>
                            <div className="space-y-4 md:space-y-6">
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
                                        //   disabled={otpSent}
                                        className={`bg-gray-50 border ${
                                            errors.phone_no
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 mb-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                        {...register("phone_no", {
                                            required:
                                                "Contact number is required",
                                            maxLength: {
                                                value: 10,
                                                message:
                                                    "Contact number cannot exceed 10 characters",
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
                                {!otpSent && <div id="recaptcha"></div>}
                                {otpSent && (
                                    <OTPInput
                                        className={`otp-container`}
                                        value={otp}
                                        onChange={setOtp}
                                        autoFocus
                                        OTPLength={6}
                                        otpType="number"
                                        disabled={false}
                                    />
                                )}

                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-teal-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-teal-600 dark:ring-offset-gray-800"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="remember"
                                                className="text-gray-500 dark:text-gray-300"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <Link
                                        to="/forgot-password"
                                        className="text-sm font-medium text-teal-600 hover:underline dark:text-teal-500"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                {otpSent ? (
                                    <button
                                        onClick={login}
                                        className="text-white bg-teal-600 py-1.5 px-4 rounded font-bold w-full"
                                    >
                                        Login
                                        {loading ? (
                                            <Spinner
                                                className="ml-2"
                                                aria-label="Default status example"
                                            />
                                        ) : null}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleGenerateOtp}
                                        className="text-white bg-teal-600 py-1.5 px-4 rounded font-bold w-full"
                                    >
                                        Send Otp
                                        {loading ? (
                                            <Spinner
                                                className="ml-2"
                                                aria-label="Default status example"
                                            />
                                        ) : null}
                                    </button>
                                )}
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don&apos;t have an account yet?{" "}
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
