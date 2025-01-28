import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function AdminRoute() {
    const userState = useSelector((state) => state.user);
    const currentUser = userState.user;

    if (userState.loading) {
        return (
            <>
                <div className="h-screen flex items-center justify-center">
                    <h1 className="font-bold text-4xl">Loading...</h1>
                </div>
            </>
        );
    }
    if (currentUser && currentUser.role == "admin") {
        console.log(currentUser.role);

        return <Outlet />;
    } else if (currentUser) {
        return (
            <>
                <div className="h-screen flex items-center justify-center">
                    <h1 className="font-bold text-4xl">
                        Only available For admins.
                    </h1>
                </div>
            </>
        );
    } else {
        return <h1> Only available for admins.</h1>;
        // return <Navigate to="/login" />;
    }

    return <div>AdminRoute</div>;
}

export default AdminRoute;
