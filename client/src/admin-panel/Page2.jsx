import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Spinner } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpoints } from "../config/endpoints";

function Page2() {
    const [loading, setLoading] = useState(false);

    const notifySuccess = () =>
        toast.success("🦄 Form submitted!", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    const notifyError = () =>
        toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading((prev) => true);
            const response = await axios.post(endpoints.postSurveyData, data);
            // console.log("Form submitted successfully:", response.data);
            notifySuccess();
        } catch (error) {
            console.error("Error submitting form:", error);
            notifyError();
        } finally {
            setLoading((prev) => false);
        }
    };

    return (
        <div className="max-w-4xl mx-10 p-8 bg-[#e4e6ea] rounded-3xl font-fredoka">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-6">Customer Survey Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Row 1: Name and Contact Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            {...register("name", {
                                required: "Name is required",
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            {...register("contactNumber", {
                                required: "Contact number is required",
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {errors.contactNumber && (
                            <p className="text-red-500 text-sm">
                                {errors.contactNumber.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Row 2: Email and Family Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Total Family Members
                        </label>
                        <input
                            type="number"
                            {...register("familyNumber", {
                                required: "Family number is required",
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {errors.familyNumber && (
                            <p className="text-red-500 text-sm">
                                {errors.familyNumber.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Row 3: Location and Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <input
                            type="text"
                            {...register("location", {
                                required: "Location is required",
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {errors.location && (
                            <p className="text-red-500 text-sm">
                                {errors.location.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <textarea
                            {...register("address", {
                                required: "Address is required",
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        ></textarea>
                        {errors.address && (
                            <p className="text-red-500 text-sm">
                                {errors.address.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Row 4: Reference and Concern */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Reference
                        </label>
                        <input
                            type="text"
                            {...register("reference")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Customer Concern
                        </label>
                        <textarea
                            {...register("concern")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        ></textarea>
                    </div>
                </div>

                {/* Row 5: Flour Preference and Feedback */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Flour Preference
                        </label>
                        <select
                            {...register("flourPreference")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Select an option</option>
                            <option value="packed">
                                Packed (Specify brand)
                            </option>
                            <option value="local">Local Aata Chakki</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Valuable Feedback for Customer
                        </label>
                        <textarea
                            {...register("feedback")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        ></textarea>
                    </div>
                </div>

                {/* Row 6: Report Completed By */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Report Completed By
                    </label>
                    <input
                        type="text"
                        {...register("reportCompletedBy", {
                            required: "Report Completed By is required",
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.reportCompletedBy && (
                        <p className="text-red-500 text-sm">
                            {errors.reportCompletedBy.message}
                        </p>
                    )}
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700"
                    >
                        Submit Survey{" "}
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
    );
}

export default Page2;
