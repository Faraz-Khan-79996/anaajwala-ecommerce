import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  clearError,
  fetchUser,
  loginUser,
  signoutUser,
} from "./features/user/userSlice.js";
import "./App.css";

import LandingPage from "./pages/Landing-page/LandingPage";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Layout from "./components/Layout.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import Dashboard from "./admin-panel/Dashboard.jsx";
import ProductPage from "./pages/product-page/ProductPage.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import CartPage from "./pages/Cart/CartPage.jsx";
import Products from "./pages/products/Products.jsx";
import Orders from "./pages/orders/Orders.jsx";
import ForgotPassword from "./pages/forgot-password/ForgotPassword.jsx";
import ResetPassword from "./pages/forgot-password/ResetPassword.jsx";
import AboutUs from "./pages/about-us/AboutUs.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import ContactUs from "./pages/contact-us/ContactUs.jsx";
import Privacy from "./pages/Policy-pages/Privacy.jsx";
import TermsOfUse from "./pages/Policy-pages/TermsOfUse.jsx";
import ReturnRefund from "./pages/Policy-pages/ReturnRefund.jsx";
import BillingTerms from "./pages/Policy-pages/BillingTerms.jsx";
import Loader from "./components/Loader.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {

  const [loading , setLoading ] = useState(true)
  // const { pathname } = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchUserOnLoad(){
      await dispatch(fetchUser());
      dispatch(clearError())
      setLoading(false)
    }
    fetchUserOnLoad()
  }, []);


  if(loading){
    return (
      <Loader />
    )
  }

  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/user/cart" element={<CartPage/>} />
          <Route path="/user/orders" element={<Orders/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/user/profile" element={<Profile/>} />
          <Route path="/contact-us" element={<ContactUs/>} />
          <Route path="/privacy-policy" element={<Privacy/>} />
          <Route path="/terms-and-condition" element={<TermsOfUse/>} />
          <Route path="/return-refund" element={<ReturnRefund/>} />
          <Route path="/billing-policy" element={<BillingTerms/>} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:username/:id/:token" element={<ResetPassword />} />

        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/not-found" element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
