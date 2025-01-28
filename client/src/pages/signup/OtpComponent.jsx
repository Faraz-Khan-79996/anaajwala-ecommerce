import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Spinner, Tooltip } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import OTPInput from "otp-input-react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase.js"; // Ensure you configure Firebase auth in a separate file
import { toast, Toaster } from "react-hot-toast"; // Import toast

function OtpComponent({ setOtpVerified, setPhoneNumber, setError }) {
    const [loading, setLoading] = useState(false);
    // const [otpVerified, setOtpVerified] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [verificationResult, setVerificationResult] = useState(null);

    const {
        register,
        formState: { errors },
        getValues,
    } = useForm();

    // toast.success("SUCESSSS")
    // getValues("phone_no")
    const generateOtp = async () => {
        try {
            // console.log(`+91${getValues("phone_no")}`);

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
            console.log(confirmationResult);

            setOtpSent(true); // Show OTP input after OTP is sent // Show success toast
        } catch (error) {
            console.error("Error sending OTP:", error);
            setError(error.message);
            toast.error("Error sending OTP, Refresh and try again!" , {duration:10000}); // Show error toast
        }
    };

    const handleVerifyOtp = async () => {
        setLoading(true); // Show loader
        try {
            await verificationResult.confirm(otp);
            setOtpVerified(true);
            // alert("OTP WAS CORRECT!")
            setPhoneNumber(getValues("phone_no"));
        } catch (error) {
            console.error("Error verifying OTP:", error);
            toast.error("OTP incorrect!"); // Show error toast
        } finally {
            setLoading(false); // Hide loader
        }
    };

    async function handleGenerateOtp() {
        setLoading(() => true);
        try {
            const { data } = await axios.get(
                `/api/auth/duplicate-phone/${getValues("phone_no").trim()}`
            );

            if (data.isPhoneNumberDuplicate) {
                return setError(data.message);
            }
            await generateOtp();
        } catch (error) {
            setError("Error processing your phone number");
            return;
        } finally {
            setLoading(() => false); // Hide loader
        }
    }

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-full">
                <input
                    placeholder="Enter your phone number"
                    type="text"
                    name="phone_no"
                    id="phone_no"
                    disabled={otpSent}
                    className={`bg-gray-50 w-full inline-flex items-center justify-center py-2.5 px-5 mr-2 mb-2 ${
                        errors.phone_no ? "border-red-500" : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    {...register("phone_no", {
                        required: "Contact number is required",
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

            <div
                onClick={handleGenerateOtp}
                className="text-violet-600 text-center cursor-pointer"
            >
                Click to generate Otp
                {loading ? (
                    <Spinner
                        className="ml-2"
                        aria-label="Default status example"
                    />
                ) : null}
            </div>

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
            <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={!otpSent}
                className={`w-full text-white ${
                    !otpSent ? "cursor-not-allowed" : ""
                } bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-teal-800`}
            >
                Verify OTP
                {loading ? (
                    <Spinner
                        className="ml-2"
                        aria-label="Default status example"
                    />
                ) : null}
            </button>
        </>
    );
}

export default OtpComponent;
