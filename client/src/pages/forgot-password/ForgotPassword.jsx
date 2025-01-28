import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, clearUser } from "../../features/user/userSlice";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const notify = () =>
        toast.success(
            "Reset Link was sent to your registered whatsapp number to this platform number",
            { autoClose: 10000, position: "top-right" },
        );

    // Initialize useForm hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    // Handle form submission
    const onSubmit = async (data) => {
        // console.log(data);
        // dispatch(loginUser(data))
        // console.log(data)
        setLoading((prev) => true);
        try {
            const { data: res } = await axios.post(
                "/api/auth/forgot-password",
                { username: data.username.toLowerCase() },
            );
            console.log(res);
            notify();
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError(error.message);
            }
        } finally {
            setLoading((prev) => false);
        }
    };

    useEffect(() => {
        if (user.user) {
            navigate("/");
        }
    }, [user]);

    return (
        <section className="py-4 md:py-8 dark:bg-gray-800">
            <ToastContainer />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                {error ? (
                    <>
                        <Alert
                            onDismiss={() => setError("")}
                            className="mb-4"
                            color="failure"
                            icon={HiInformationCircle}
                        >
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
                            Reset your password
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* <button
                                className="w-full inline-flex items-center justify-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                type="button"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    viewBox="0 0 21 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_13183_10121)">
                                        <path
                                            d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                                            fill="#3F83F8"
                                        />
                                        <path
                                            d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                                            fill="#FBBC04"
                                        />
                                        <path
                                            d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                                            fill="#EA4335"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_13183_10121">
                                            <rect
                                                width={20}
                                                height={20}
                                                fill="white"
                                                transform="translate(0.5)"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Sign up with Google
                            </button> */}
                        </form>
                        <div className="flex items-center">
                            <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
                            {/* <div className="px-5 text-center text-gray-500 dark:text-gray-400"> */}
                            {/* or */}
                            {/* </div> */}
                            <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
                        </div>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Enter your registered username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    {...register("username", {
                                        required: "Username is required",
                                    })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="eg. John Wick"
                                />
                                {errors.username && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>
                            {/* <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    OTP
                                </label>
                                <input
                                    type="text"
                                    name="OTP"
                                    id="password"
                                    {...register("OTP", {
                                        required: "Password is required",
                                    })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div> */}
                            {/* <div className="flex items-center justify-between">
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
                            </div> */}
                            <button
                                type="submit"
                                className="text-white bg-teal-600 py-1.5 px-4 rounded font-bold w-full"
                            >
                                Reset Your password
                                {loading ? (
                                    <Spinner
                                        className="ml-2"
                                        aria-label="Default status example"
                                    />
                                ) : null}
                            </button>
                            {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{" "}
                                <Link
                                    to="/signup"
                                    className="font-medium text-teal-600 hover:underline dark:text-teal-500"
                                >
                                    Sign up
                                </Link>
                            </p> */}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ForgotPassword;
