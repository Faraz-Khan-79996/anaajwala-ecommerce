// const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';
const BASE_URL = ""

export const endpoints = {

    BASE_URL,

    siteInfo : `${BASE_URL}/api/site/info`,//done
    getOrders : `${BASE_URL}/api/order/orders`,//done
    getOrder : (id) => `${BASE_URL}/api/order/${id}`,//done
    getUserOrders : `${BASE_URL}/api/user/orders`,//done
    postSurveyData : `${BASE_URL}/api/survey`,//done
    updateOrder :(id)=> `${BASE_URL}/api/order/${id}/update`,//done
    createProduct : `${BASE_URL}/api/product/create`,//done
    updateProduct : (id) => `${BASE_URL}/api/product/${id}/update`,//done
    getUserProfile : `${BASE_URL}/api/user/profile`,//done
    signInUser : `${BASE_URL}/api/auth/signin`,//done
    signUpUser : `${BASE_URL}/api/auth/signup`,//done
    signoutUser : `${BASE_URL}/api/auth/signout`,//done
    deleteUser : `${BASE_URL}/api/user/delete`,//done
    getProduct : (id) => `${BASE_URL}/api/product/${id}`,//done
    getProducts : `${BASE_URL}/api/product/products`,//done
    createOrder : `${BASE_URL}/api/order/create`,//done
    forgotPassword : `${BASE_URL}/api/auth/forgot-password`,//done
    resetPassword : (id , token) => `${BASE_URL}/api/auth/reset-password/${id}/${token}`,//done
    checkDuplicatePhone : (phone) => `${BASE_URL}/api/auth/duplicate-phone/${phone}`,//done
    updateUserProfile : `${BASE_URL}/api/user/profile/update`,//done
    googleAuth : `${BASE_URL}/api/auth/google`,//done
}