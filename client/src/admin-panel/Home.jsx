import React, { useEffect, useState } from "react";
import { useInfo } from "../hooks/useInfo.js";
import axios from "axios";
import InfoBlocks from "./components/InfoBlocks.jsx";
import UserTable from "./components/user-table/UserTable.jsx";
import { endpoints } from "../config/endpoints.js";

function Home() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        async function getInfo() {
            try {
                setLoading((prev) => true);
                const { data } = await axios.get(endpoints.siteInfo , {
                    withCredentials: true,
                });
                const res = useInfo(data);
                // console.log(res);
                setData(res);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading((prev) => false);
            }
        }
        getInfo();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <h1 className="text-5xl my-auto text-center font-semibold">
                    Loading...
                </h1>
            </div>
        );
    }

    return (
        <div>
            <InfoBlocks {...data} />
            <UserTable users={data.users} />
        </div>
    );
}

export default Home;
