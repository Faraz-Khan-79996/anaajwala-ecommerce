// import Harsh from '../assets/Harsh1.jpg'
import faraz from "../assets/team/faraz.jpg";
import manasvi from "../assets/team/manasvi.jpg";
// import subhan from '../assets/team/subhan.jpg'
import isha from "../assets/team/isha.jpeg";
import shruti from "../assets/team/shruti.jpg";
// import jayaMam from '../assets/team/jayaMam.jpg'
import mayur from "../assets/team/mayur.jpg";
import lalitSir from "../assets/mentor-image/lalitSir.jpg";
import ashishSir from "../assets/mentor-image/ashishSir.jpg";
import PriyankRana from "../assets/mentor-image/priyankRana.jpg";
import Dhakad from "../assets/mentor-image/Dhakad.jpg";
import rajat from "../assets/team/rajat.jpeg";

const useTeamData = () => {
    const teamData = [
        {
            image: mayur,
            name: "Mayur Chouhan",
            profile: "CTO",
            description:
                "Mayur Chouhan, our CTO, has played a crucial role as a mentor in development. His technical expertise and innovative mindset have been instrumental in guiding our project and shaping its success.",
            github: "https://github.com/Faraz-Khan-79996",
            linkdin: "https://www.linkedin.com/in/faraz-khan-b2a42028a/",
        },
        {
            image: faraz,
            name: "Faraz Khan",
            profile: "Lead Web Developer",
            description:
                "Faraz Khan, our lead Web Developer, brings his expertise as an IT engineer to the forefront, driving our project with a fresh perspective and a commitment to cutting-edge digital solutions.",
            github: "https://github.com/Faraz-Khan-79996",
            linkdin: "https://www.linkedin.com/in/faraz-khan-b2a42028a/",
        },
        {
            image: isha,
            name: "Isha Patel",
            profile: "Web Developer",
            description:
                "Isha Patel, the  Web Developer of our project, is an IT engineer with a strong talent for content writing, ensuring both technical excellence and engaging content.",
            github: "https://github.com/ishaa-p7",
            linkdin: "https://www.linkedin.com/in/isha-patel-842a95254/",
        },
        {
            image: manasvi,
            name: "Manasvi Ajmera",
            profile: "Web Developer",
            description:
                "Manasvi Ajmera, our Web Developer and IT Engineer, excels in both technical development and design, blending her creative flair with expert coding to elevate our project to new heights.",
            github: "https://github.com/manasviajmera",
            linkdin: "https://www.linkedin.com/in/manasvi-ajmera-b2000525a/",
        },
        {
            image: shruti,
            name: "Shruti dwivedi",
            profile: "Asst.Manager & Lead social media",
            description:
                "Shruti Dwivedi, Asst. Manager & Lead for Social Media at Anajwala, drives impactful digital strategies and enhances brand presence across platforms, ensuring our commitment to quality reaches every customer online.",
            github: "",
            linkdin: "",
        },
        {
            image: rajat,
            name: "Mr.Rajat Devgade",
            profile: "Social Media & E commerce manager",
            description:
                "Mr.Rajat Devgade, Social Media & E commerce manager at Anajwala, drives impactful digital strategies and enhances brand presence across platforms, ensuring our commitment to quality reaches every customer online.",
            github: "",
            linkdin: "",
        },
    ];

    return teamData;
};

const useMentorData = () => {
    const mentorData = [
        {
            name: "Dr. Ashish Mahajan",
            role: "Asst. Prof SGSITS",
            image: ashishSir,
        },
        {
            name: "Dr. KK Dhakad",
            role: "Asst. Prof SGSITS",
            image: Dhakad,
        },
        {
            name: "Dr. Lalit Purohit",
            role: "HOD (IT) SGSITS",
            image: lalitSir,
        },
        {
            name: "CA .Priyank Rana",
            role: "Charted Accountant",
            image: PriyankRana,
        },
    ];

    return mentorData;
};

export { useTeamData, useMentorData };
