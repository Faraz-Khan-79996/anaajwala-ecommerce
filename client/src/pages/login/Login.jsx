import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, clearUser } from "../../features/user/userSlice";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import OAuth from "../../components/OAuth";

function Login() {
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
        data.username = data.username.toLowerCase();
        dispatch(loginUser(data));
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
                                {/* <div className="px-5 text-center text-gray-500 dark:text-gray-400">
                                    or
                                </div> */}
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
                                        Your username
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
                                        {...register("password", {
                                            required: "Password is required",
                                        })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="••••••••"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
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
                                <button
                                    type="submit"
                                    className="text-white bg-teal-600 py-1.5 px-4 rounded font-bold w-full"
                                >
                                    Sign in
                                    {user.loading ? (
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
