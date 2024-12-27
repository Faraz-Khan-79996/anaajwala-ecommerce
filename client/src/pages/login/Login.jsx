import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearUser } from "../../features/user/userSlice";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import OAuth from "../../components/OAuth";
import axios from "axios";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");

    async function generateOTP() {
        // Send OTP to the phone number
        setIsLoading(true);
        try {
            const response = await axios.post(
                "/api/auth/sendOTP?action=signin",
                { phone_no : getValues().phone_no}
            );

            if (response.data.message) {
                setIsOtpSent(true); // OTP sent successfully, now prompt for OTP
                setAlertMessage("OTP has been sent to your phone number.");
                setAlertType("success");
            } else {
                setAlertMessage("Error sending OTP. Please try again.");
                setAlertType("failure");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setAlertMessage(error.response.data.message);
                setAlertType("failure");
            } else {
                setAlertMessage("Error sending OTP. Please try again.");
                setAlertType("failure");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const onSubmit = async (data) => {
        const phone_no = data.phone_no;
        const otpEntered = otp; // Take OTP value from state

        // Validate OTP and log in
        setIsLoading(true);
        try {
            await dispatch(loginUser({ phone_no, otp: otpEntered }));
        } catch (error) {
            setAlertMessage("Error during login. Please check your OTP.");
            setAlertType("failure");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user.user) {
            navigate("/");
        }
    }, [user]);

    return (
        <>
            <section className="py-4 md:py-8 dark:bg-gray-800">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    {user.error ? (
                        <>
                            <Alert
                                onDismiss={() => dispatch(clearUser())}
                                className="mb-4"
                                color="failure"
                                icon={HiInformationCircle}
                            >
                                <span className="font-medium">Error!</span>{" "}
                                {user.error}
                            </Alert>
                        </>
                    ) : null}

                    {/* Alert for OTP */}
                    {alertMessage && (
                        <Alert
                            className="mb-4"
                            color={alertType === "success" ? "success" : "failure"}
                            icon={HiInformationCircle}
                        >
                            <span className="font-medium">{alertType === "success" ? "Success!" : "Error!"}</span>{" "}
                            {alertMessage}
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
                                Sign in to your account
                            </h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <OAuth />
                            </form>
                            <div className="flex items-center">
                                <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
                            </div>

                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div>
                                    <label
                                        htmlFor="phone_no"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phone_no"
                                        id="phone_no"
                                        {...register("phone_no", {
                                            required: "Phone number is required",
                                        })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter phone number"
                                    />
                                    {errors.phone_no && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.phone_no.message}
                                        </p>
                                    )}
                                </div>

                                {/* {isOtpSent && ( */}
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
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Enter OTP"
                                        />
                                    </div>
                                {/* )} */}

                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        // onClick={handleSubmit(onSubmit)}
                                        onClick={generateOTP}
                                        className="text-teal-600 text-sm font-medium dark:text-teal-500"
                                    >
                                        {/* {isOtpSent ? "Resend OTP" : "Generate OTP"} */}
                                        Generate OTP
                                    </button>
                                    <Link
                                        to="/forgot-password"
                                        className="text-sm font-medium text-teal-600 hover:underline dark:text-teal-500"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <button
                                    type="submit"
                                    className="text-white bg-teal-600 py-1.5 px-4 rounded font-bold w-full"
                                >
                                    Sign in
                                    {isLoading ? (
                                        <Spinner
                                            className="ml-2"
                                            aria-label="Default status example"
                                        />
                                    ) : null}
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?{" "}
                                    <Link
                                        to="/signup"
                                        className="font-medium text-teal-600 hover:underline dark:text-teal-500"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
