import React from "react";
import { useTeamData } from "../../../hooks/useTeamData";

function Team() {
    const teamData = useTeamData();

    return (
        <>
            <div className="container flex justify-center mx-auto pt-16 pb-0">
                <div>
                    <p className="text-gray-500 dark:text-gray-200 text-lg text-center font-normal pb-3">
                        BUILDING TEAM
                    </p>
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
                                                    href="javascript:void(0)"
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
                                                    href="javascript:void(0)"
                                                    className="mx-5"
                                                >
                                                    <div
                                                        aria-label="Twitter"
                                                        role="img"
                                                    >
                                                        <img
                                                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/gray-bg-with-description-svg2.svg"
                                                            alt="twitter"
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