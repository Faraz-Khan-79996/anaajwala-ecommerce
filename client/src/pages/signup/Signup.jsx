import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import OAuthSignup from "../../components/OAuthSignup.jsx";

import OtpComponent from "./OtpComponent.jsx";
import CreateAccount from "./CreateAccount.jsx";

const Signup = () => {
    const user = useSelector((state) => state.user);
    const [otpVerified, setOtpVerified] = useState(false);
    const [error, setError] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (user.user) {
            navigate("/");
        }
    }, [user]);

    return (
        <>
            <section className="py-4 md:py-8 dark:bg-gray-800">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    {error ? (
                        <>
                            <Alert
                                onDismiss={() => setError(null)}
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
                                Create your account
                            </h1>
                            <OAuthSignup />
                            <div className="flex items-center">
                                <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
                                <div className="px-5 text-center text-gray-500 dark:text-gray-400">
                                    or
                                </div>
                                <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
                            </div>
                            {!otpVerified && (
                                <OtpComponent
                                    setOtpVerified={setOtpVerified}
                                    setError={setError}
                                    setPhoneNumber={setPhoneNumber}
                                />
                            )}
                            {otpVerified && (
                                <CreateAccount
                                    setError={setError}
                                    phoneNumber={phoneNumber}
                                />
                            )}

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-medium text-teal-600 hover:underline dark:text-teal-500"
                                >
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Signup;
