import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUser } from "../../features/user/userSlice.js";
import axios from "axios";
import { Spinner } from "flowbite-react";


function CreateAccount({ error, setError , phoneNumber }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

        console.log(data);
        setLoading(true);

        try {
            const {data : user} = await axios.post('/api/auth/signup' , {
                username : data.username.toLowerCase().trim(),
                phone_no : phoneNumber.trim(),
            })

            dispatch(addUser(user))
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
                className="space-y-4 md:space-y-6"
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
                        } text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        placeholder="eg. John Wick"
                        {...register("username", {
                            required: "Username is required",
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
                    className={`w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800`}
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
