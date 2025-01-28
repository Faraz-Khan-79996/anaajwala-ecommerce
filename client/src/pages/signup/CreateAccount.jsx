import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUser } from "../../features/user/userSlice.js";
import axios from "axios";
import { Spinner } from "flowbite-react";
import { useSearchParams } from "react-router-dom";

function CreateAccount({ error, setError, phoneNumber }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        setLoading(true);

        try {
            const { data: response } = await axios.post(
                "/api/auth/signup",
                {
                    username: data.username.toLowerCase().trim(),
                    phone_no: phoneNumber.trim(),
                },
                {
                    params: {
                        referralGiver: searchParams.get("referralGiver"),
                    },
                },
            );
            dispatch(addUser(response.user));
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6 w-full"
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
                        className={`bg-gray-50 border ${
                            errors.username
                                ? "border-red-500"
                                : "border-gray-300"
                        } text-gray-900 sm:text-sm rounded-lg focus:ring-violet-700 focus:border-violet-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        placeholder="eg. John Wick"
                        {...register("username", {
                            required: "Username is required",
                            min: 5,
                        })}
                    />
                    {errors.username && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.username.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    // disabled={!otpVerified}
                    className={`w-full text-white bg-violet-700 hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-700 dark:hover:bg-violet-700 dark:focus:ring-teal-800`}
                >
                    Create your account
                    {loading ? (
                        <Spinner
                            className="ml-2"
                            aria-label="Default status example"
                        />
                    ) : null}
                </button>
            </form>
        </>
    );
}

export default CreateAccount;
