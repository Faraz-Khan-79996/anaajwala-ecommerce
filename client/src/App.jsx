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
import AddContactNumberPage from "./pages/signup/AddContactNumberPage.jsx";
import EditProduct from "./admin-panel/components/sub-pages/EditProduct.jsx";
import Page1 from "./admin-panel/Page1.jsx";
import Page2 from "./admin-panel/Page2.jsx";
import Page3 from "./admin-panel/Page3.jsx";
import Home from "./admin-panel/Home.jsx";
import CreateProduct from "./admin-panel/components/sub-pages/CreateProduct.jsx";
import NewProfile from "./pages/Profile/NewProfile.jsx";
import BulkOrdersPage from "./pages/bulkorder-page/BulkOrdersPage.jsx";
import InvoicePage from "./pages/invoice-page/InvoicePage.jsx";

function App() {
    const [loading, setLoading] = useState(true);
    // const { pathname } = useLocation();

    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchUserOnLoad() {
            await dispatch(fetchUser());
            dispatch(clearError());
            setLoading(false);
        }
        fetchUserOnLoad();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="" element={<Layout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/user/cart" element={<CartPage />} />
                    <Route path="/user/orders" element={<Orders />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/user/profile" element={<NewProfile />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/privacy-policy" element={<Privacy />} />
                    <Route
                        path="/terms-and-condition"
                        element={<TermsOfUse />}
                    />
                    <Route path="/return-refund" element={<ReturnRefund />} />
                    <Route path="/billing-policy" element={<BillingTerms />} />
                    <Route path="/bulk-order" element={<BulkOrdersPage />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/invoice/:id" element={<InvoicePage />} />
                <Route
                    path="/add-contact-number"
                    element={<AddContactNumberPage />}
                />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                    path="/reset-password/:username/:id/:token"
                    element={<ResetPassword />}
                />

                <Route path="/admin" element={<AdminRoute />}>
                    <Route path="" element={<Dashboard />}>
                        <Route path="" element={<Home />} />
                        <Route path="orders" element={<Page1 />} />
                        <Route path="customer-data-form" element={<Page2 />} />
                        <Route path="products" element={<Page3 />} />
                        <Route
                            path="product/edit/:productId"
                            element={<EditProduct />}
                        />
                        <Route
                            path="product/create"
                            element={<CreateProduct />}
                        />
                    </Route>
                </Route>

                <Route path="/not-found" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
