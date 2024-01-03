import React from "react";
import { SocialIcon } from 'react-social-icons';

function About() {
  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <h1 className="text-center text-2xl text-red-500 m-4 border-2 border-red-500 p-2">
        This is just a Project Work Not a Real WebSite
      </h1>
      <div className="border-2 w-2/3 text-center rounded-xl border-orange-400 h-1/2">
        <h2 className="text-orange-400 text-lg">About Me</h2>
        <span className="text-orange-300 text-2xl">
          I am Full Stack Developer Specializing in MERN Stack <br /> Building
          Scalable & Efficient Web Applications with WebApps Security
        </span>
        <p className="mt-4 text-xl text-orange-300">
        <h2 className="underline m-2">Description</h2>
          Trained in MongoDB, Express.js, React.js, and Node.js (MERN), along
          with proficiency in JavaScript, HTML, and CSS. Strong engineering
          Lerner with a focus on understanding and implementing business
          processes, creating database schemas, and ensuring accessibility and
          security compliance. Proficient in integrating multiple data sources
          and databases into one system and understanding the nature of
          asynchronous programming. Love to creating user-friendly
          interfaces and optimizing web functionality to deliver an outstanding
          user experience.
        </p>
        <div className="my-4">
            <SocialIcon url="https://www.linkedin.com/in/saurabh-kumar-1512a4246/" className="hover:scale-110 transistion-all ease-in-out duration-300 mx-3"/>
            <SocialIcon url="https://github.com/SAURABH-KUM4R" className="hover:scale-110 transistion-all ease-in-out duration-300 mx-3"/>
            {/* <SocialIcon url="PortFolio" className="hover:scale-110 transistion-all ease-in-out duration-300 mx-3"/> */}
        </div>
      </div>
      
    </div>
  );
}

export default About;
