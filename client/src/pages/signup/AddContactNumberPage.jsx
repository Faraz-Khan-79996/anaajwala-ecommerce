import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin } from "../../features/user/userSlice";
import { addUser } from "../../features/user/userSlice";
import axios from "axios";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { endpoints } from "../../config/endpoints";

function AddContactNumberPage() {
    const location = useLocation();
    const data = location.state;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    // console.log(data);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [confirmPhoneNumber, setConfirmPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [SignupError, setSignupError] = useState(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (user.user) {
            navigate("/");
        }
    }, [user]);

    const validatePhoneNumber = (number) => {
        const phoneRegex = /^[6-9]\d{9}$/; // Regex for a valid 10-digit phone number starting with 6-9
        return phoneRegex.test(number);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePhoneNumber(phoneNumber)) {
            setError(
                "Invalid phone number. Please enter a 10-digit valid number.",
            );
            return;
        }

        if (phoneNumber !== confirmPhoneNumber) {
            setError("Phone numbers do not match!");
            return;
        }
        setError("");
        // Proceed with finalizing the sign-up process
        // console.log("Phone number added successfully:", phoneNumber);

        try {
            setLoading((prev) => true);
            const { data: response } = await axios.post(
                // `/api/auth/google?auth-signup`,
                endpoints.googleAuth,
                { phone_no: confirmPhoneNumber, ...data },
                {
                    params: {
                        auth: "signup",
                        referralGiver: searchParams.get("referralGiver"),
                    },
                }, // Query parameters go here
            );

            dispatch(addUser(response.user));
            navigate("/");
        } catch (error) {
            if (error.response && error.response.data.message) {
                setSignupError(error.response.data.message);
            } else {
                setSignupError(error.message);
            }
        } finally {
            setLoading((prev) => false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                {SignupError ? (
                    <>
                        <Alert
                            onDismiss={() => setSignupError(null)}
                            className="mb-4"
                            color="failure"
                            icon={HiInformationCircle}
                        >
                            <span className="font-medium">Error!</span>{" "}
                            {SignupError}
                        </Alert>
                    </>
                ) : null}
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Finalize Your Sign-Up
                </h1>
                <p className="text-gray-500 text-sm mb-6 text-center">
                    Please enter your phone number to complete the process.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-gray-600 text-sm font-medium"
                        >
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phone"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter your phone number"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring focus:ring-violet-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirm-phone"
                            className="block text-gray-600 text-sm font-medium"
                        >
                            Confirm Phone Number
                        </label>
                        <input
                            type="text"
                            id="confirm-phone"
                            value={confirmPhoneNumber}
                            onChange={(e) =>
                                setConfirmPhoneNumber(e.target.value)
                            }
                            placeholder="Confirm your phone number"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring focus:ring-violet-500 focus:outline-none"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 font-semibold rounded-lg focus:outline-none ${
                            loading
                                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                : "bg-violet-600 text-white hover:bg-violet-700 focus:ring focus:ring-violet-500"
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Finalize Sign-Up"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddContactNumberPage;
