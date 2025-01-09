import React, { useRef, useState } from "react";
import CartItem from "./components/CartItem";
import Summary from "./components/Summary";
import CustomerDetail from "./components/CustomerDetail";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../features/cart/CartSlice";
import { format } from "date-fns";
import CheckOut from "./components/CheckOut";
import { useForm , FormProvider } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from "flowbite-react";
import 'react-toastify/dist/ReactToastify.css';
import { clearCart } from "../../features/cart/CartSlice";
import { useNavigate } from "react-router-dom";

function CartPage() {

    const priceRef = useRef(0)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.user);

    const [loading , setLoading ] = useState(false)
    
    const methods = useForm({
        mode: 'onChange', // Validate fields as they are filled
    });
    const functionThatReturnPromise = () => new Promise(resolve => setTimeout(resolve, 3000));

    const notifySuccess = ()=>            toast.success('🦄 Order Added!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    const notifyError = ()=>            toast.error('Something went wrong!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    const onSubmit = async (data) => {
        const items = cart.map(item =>{
            const obj = {
                productId : item.id,
                productName : item.product.name,
                quantity : item.quantity,
                price : Number(item.product.price) * Number(item.quantity),
                type : item.product.type,
                thumbnail : item.product.thumbnail,
                texture : item.texture
            }
            return obj;
        })
        
        const payload = {
            customerName : user.username,
            customer_phone_no : user.phone_no,
            address : data.address,
            pincode : data.pincode,
            customerId : user._id,
            paymentMethod : "cash on delivery",
            totalPrice : priceRef.current,
            items,
        }
        // console.log(payload);
        
        try {
            setLoading(prev => true)
            const {data} = await axios.post(`/api/order/create` , payload , {withCredentials : true})
            console.log(data);
            notifySuccess()
            dispatch(clearCart())
            // navigate('/')
            
        } catch (error) {
            // console.log(error.response.data);
            notifyError()
        }
        finally{
            setLoading(false)
        }
    };


    // const [products, setProducts] = useState([]);//this will have array of products
    // const [error, setError] = useState(null);
    // const [loading, setLoading] = useState([]);

    // useEffect(() => {
    //   getProducts();
    // }, []);

    // const getProducts = async () => {
    //   try {
    //     setLoading((prev) => true);
    //     const { data } = await axios.get("/api/product/products");
    //     setProducts(data);
    //   } catch (error) {
    //     if (error.response && error.response.data) {
    //       setError(error.response.data.message);
    //     } else {
    //       setError(error.message);
    //     }
    //   } finally {
    //     setLoading((prev) => false);
    //   }
    // };

    // if (loading) {
    //   return (
    //     <div className="h-screen flex items-center justify-center">
    //       <h1 className="text-5xl my-auto text-center font-semibold">Loading...</h1>
    //     </div>
    //   )
    // }

    return (
        <>
            {/* component */}
            <ToastContainer />
            <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}
                <div className="flex justify-start item-start space-y-2 flex-col">
                    <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                        Cart
                    </h1>
                    <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                        {format(Date.now(), "d MMMM yyyy ',' h:mm a")}
                    </p>
                </div>
                <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                                <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                    <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                                        Customer’s Cart
                                    </p>

                                    {cart &&
                                        cart.length > 0 &&
                                        cart.map((item , index) => (
                                                <CartItem key={index} item={item} />
                                        ))}
                                </div>
                                <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                    <Summary cart={cart} ref={priceRef} />
                                    <CheckOut loading={loading} />
                                </div>
                            </div>
                            <CustomerDetail />
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>
    );
}

export default CartPage;
