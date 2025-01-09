import React, { useEffect, useState } from "react";
import { Card, Avatar, Button } from "flowbite-react";
import { FaCoins, FaShoppingCart, FaUser, FaPhone, FaShareAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RWebShare } from "react-web-share";

function NewProfile() {
  const { user: currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  
  if (!currentUser) return null;
  const referralLink = `${window.location.origin}/signup?referralGiver=${currentUser?.phone_no}`;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="col-span-1">
          <div className="flex flex-col items-center">
            <Avatar
              size="lg"
              img={currentUser.avatar}
              rounded={true}
              alt="User Avatar"
              className="mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
              <FaUser className="mr-2 text-blue-600" /> {currentUser.username}
            </h2>
            <p className="text-gray-500 flex items-center">
              <FaPhone className="mr-2 text-green-600" /> {currentUser.phone_no}
            </p>
          </div>
        </Card>

        {/* Main Content */}
        <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Coins Card */}
          <Card className="flex flex-col items-center">
            <FaCoins className="text-yellow-500 text-4xl mb-2" />
            <p className="text-gray-600 text-sm">Coins</p>
            <p className="text-3xl font-semibold text-gray-800 mt-1">{currentUser.coins}</p>
          </Card>

          {/* Orders Card */}
          <Card className="flex flex-col items-center">
            <FaShoppingCart className="text-blue-500 text-4xl mb-2" />
            <p className="text-gray-600 text-sm">Orders</p>
            <p className="text-3xl font-semibold text-gray-800 mt-1">{currentUser.orders?.length}</p>
          </Card>

          {/* Referral Card */}
          <Card className="flex flex-col items-center justify-center">
            <FaShareAlt className="text-purple-600 text-4xl mb-4" />
            <p className="text-gray-600 text-center mb-4">
              Invite your friends and earn rewards when they sign up!
            </p>
            <RWebShare
              data={{
                title: "Join our E-commerce platform",
                text: `Sign up and get rewards using my referral link.`,
                url: referralLink,
              }}
              onClick={() => console.log("Referral link shared successfully")}
            >
              <Button gradientDuoTone="purpleToBlue">
                Share Referral Link
              </Button>
            </RWebShare>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default NewProfile;
