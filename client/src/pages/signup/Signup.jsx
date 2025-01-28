import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import OAuthSignup from "../../components/OAuthSignup.jsx";
import Logo from '../../assets/NavbarLogo2.jpeg'
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
      <section className="dark:bg-gray-800 h-screen font-fredoka">
        <div className="flex flex-col items-center justify-center px-4 py-8 mx-auto md:py-0 h-screen md:h-screen lg:py-0">
          {error ? (
            <Alert
              onDismiss={() => setError(null)}
              className="mb-4"
              color="failure"
              icon={HiInformationCircle}
            >
              <span className="font-medium">Error!</span> {error}
            </Alert>
          ) : null}

          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
              <img
                src={Logo}
                alt=""
                className="h-14 rounded-md md:h-16 md:rounded-xl"
              />
          </Link>

          <div className="max-w-md w-full bg-white shadow-lg dark:border dark:bg-gray-800 rounded-3xl md:max-w-3xl lg:max-w-[120vh] shadow-gray-400">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 bg-cover bg-[url('./assets/farm.webp')] rounded-l-3xl"></div>
              <div className="w-full md:w-1/2 p-6 space-y-4 sm:space-y-6 sm:p-8 flex flex-col justify-center items-center bg-white dark:bg-gray-800 rounded-3xl">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create your account
                </h1>
                <OAuthSignup />

                <div className="w-full flex items-center">
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
                    className="font-medium text-violet-600 hover:underline dark:text-teal-500"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
