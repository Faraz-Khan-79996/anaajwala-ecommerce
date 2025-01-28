import React from "react";
import { useTeamData, useMentorData } from "../../../hooks/useTeamData";
import linkedinLogo from "../../../assets/linkedin.svg";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

function Team() {
    const teamData = useTeamData();
    const mentorData = useMentorData();

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-white py-48 pb-0">
                <div className="flex flex-col">
                    {/* Notes */}
                    <div className="flex flex-col mt-8">
                        {/* Meet the Team */}
                        <div className="container max-w-7xl px-4">
                            {/* Section Header */}
                            <div className="flex flex-wrap justify-center text-center mb-24">
                                <div className="w-full lg:w-6/12 px-4">
                                    {/* Header */}
                                    <h1 className="text-gray-900 text-4xl font-bold mb-8">
                                        Meet Our Mentors
                                    </h1>
                                    {/* Description */}
                                </div>
                            </div>
                            {/* Team Members */}
                            <div className="flex flex-wrap">
                                {/* Member #1 */}

                                {mentorData &&
                                    mentorData.length > 0 &&
                                    mentorData.map((mentor) => (
                                        <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                                            <div className="flex flex-col">
                                                {/* Avatar */}
                                                <a href="#" className="mx-auto">
                                                    <img
                                                        className="rounded-2xl drop-shadow-md hover:drop-shadow-xl h-96 transition-all duration-200 delay-100"
                                                        src={mentor.image}
                                                        alt="Team Member 1"
                                                    />
                                                </a>
                                                {/* Details */}
                                                <div className="text-center mt-6">
                                                    {/* Name */}
                                                    <h1 className="text-gray-900 text-xl font-bold mb-1">
                                                        {mentor.name}
                                                    </h1>
                                                    {/* Title */}
                                                    <div className="text-gray-700 font-light mb-2">
                                                        {mentor.role}
                                                    </div>
                                                    {/* Social Icons */}
                                                    {/* <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
                                                <a
                                                    href="#"
                                                    className="flex rounded-full hover:bg-indigo-50 h-10 w-10"
                                                >
                                                    <FaLinkedin className="text-indigo-500 mx-auto mt-2" />
                                                </a>
                                                <a
                                                    href="#"
                                                    className="flex rounded-full hover:bg-blue-50 h-10 w-10"
                                                >
                                                    <FaTwitter className="text-blue-300 mx-auto mt-2" />
                                                </a>
                                                <a
                                                    href="#"
                                                    className="flex rounded-full hover:bg-orange-50 h-10 w-10"
                                                >
                                                    <FaInstagram className="text-orange-400 mx-auto mt-2" />
                                                </a>
                                            </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container flex justify-center mx-auto pt-16 pb-0">
                <div>
                    {/* <p className="text-gray-500 dark:text-gray-200 text-lg text-center font-normal pb-3">
                        BUILDING TEAM
                    </p> */}
                    <h1 className="xl:text-4xl text-3xl text-center text-gray-800 dark:text-white font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">
                        The Talented People Behind the Scenes of the
                        Organization
                    </h1>
                </div>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 px-10 pt-10">
                <div className="container mx-auto">
                    <div
                        role="list"
                        aria-label="Behind the scenes People "
                        className="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
                    >
                        {teamData &&
                            teamData.length > 0 &&
                            teamData.map((person) => (
                                <div
                                    role="listitem"
                                    className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5"
                                >
                                    <div className="rounded overflow-hidden shadow-md bg-white dark:bg-gray-900">
                                        <div className="absolute -mt-20 w-full flex justify-center">
                                            <div className="h-32 w-32">
                                                <img
                                                    src={person.image}
                                                    alt="Display Picture of Andres Berlin"
                                                    role="img"
                                                    className="rounded-full object-cover h-full w-full shadow-md"
                                                />
                                            </div>
                                        </div>
                                        <div className="px-6 mt-16">
                                            <h1 className="font-bold dark:text-white text-3xl text-center mb-1">
                                                {person.name}
                                            </h1>
                                            <p className="text-gray-800 dark:text-white text-sm text-center">
                                                {person.profile}
                                            </p>
                                            <p className="text-center text-gray-600 dark:text-gray-200 text-base pt-3 font-normal">
                                                {person.description}
                                            </p>
                                            <div className="w-full flex justify-center pt-5 pb-5">
                                                <a
                                                    href={
                                                        person.github ||
                                                        "javascript:void(0)"
                                                    }
                                                    className="mx-5"
                                                >
                                                    <div
                                                        aria-label="Github"
                                                        role="img"
                                                    >
                                                        <img
                                                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/gray-bg-with-description-svg1.svg"
                                                            alt="github"
                                                        />
                                                    </div>
                                                </a>
                                                <a
                                                    href={
                                                        person.linkdin ||
                                                        "javascript:void(0)"
                                                    }
                                                    className="mx-5"
                                                >
                                                    <div
                                                        aria-label="Twitter"
                                                        role="img"
                                                    >
                                                        <img
                                                            src={linkedinLogo}
                                                            alt="linkdin"
                                                            className="h-6"
                                                        />
                                                    </div>
                                                </a>
                                                <a
                                                    href="javascript:void(0)"
                                                    className="mx-5"
                                                >
                                                    <div
                                                        aria-label="Instagram"
                                                        role="img"
                                                    >
                                                        <img
                                                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/gray-bg-with-description-svg3.svg"
                                                            alt="instagram"
                                                        />
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Team;
