import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { AiOutlineMenu } from "react-icons/ai";
import userSlice, { addUser } from "../../features/user/userSlice";
import { useForm } from "react-hook-form";
import { Spinner } from "flowbite-react";
import axios from "axios";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
    const { user: currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const notify = () => toast("👍 Credentials changed!");

    useEffect(() => {
        if (!currentUser) {
            navigate("/");
        }
    }, [currentUser]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: currentUser?.username || "",
            phone_no: currentUser?.phone_no || "",
        },
    });

    const onSubmit = async (data) => {
        // console.log("Updated Profile Data:", data);
        try {
            setLoading((prev) => true);
            const { data: response } = await axios.post(
                "/api/user/profile/update",
                data,
                { withCredentials: true },
            );

            dispatch(addUser(response));
            notify();
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError(error.message);
            }
        } finally {
            setLoading((prev) => false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <ToastContainer />
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
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
                <h2 className="text-2xl font-bold text-center mb-6">
                    Profile Page
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...register("name", {
                                required: "Name is required",
                            })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.name && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="phone_no"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Phone Number
                        </label>
                        <input
                            id="phone_no"
                            type="tel"
                            {...register("phone_no", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Phone number must be 10 digits",
                                },
                            })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.phone_no && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.phone_no.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Enter Password to update
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.password && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Update Profile{" "}
                            {loading ? (
                                <Spinner
                                    className="ml-2"
                                    aria-label="Default status example"
                                />
                            ) : null}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;
