import React from "react";
import { useLocation } from "react-router-dom";
import group from "../assets/group.svg";
import send from "../assets/send.svg";
import bg from "../assets/chat-bg.png";

const Project = () => {
  const location = useLocation();
  const project = location.state.project;

  console.log(project);

  return (
    <main className="h-screen text-[rgb(80,75,56)]">
      <div className="w-[25vw] flex flex-col   h-screen">
        <div className="p-4 bg-[#F6F0F0] flex justify-between items-center">
          <h1 className=" text-2xl capitalize font-medium">{project.name}</h1>
          <button className="hover:opacity-80 duration-300 transition-all">
            {" "}
            <img src={group} className="w-5 " alt="" />
          </button>
        </div>
          
        <div className=" message-area bg-[url(src/assets/chat-bg1.jpeg)] bg-contain flex-grow flex flex-col">
          <div className="messages flex-grow"></div>
          <div className="input flex bg-primary w-full  justify-between items-center px-6 py-1   ">
            <input
              type="text"
              placeholder="Message"
              className="w-[320px] h-full py-3 bg-transparent text-lg  text-[#3d3b39] outline-none"
            />
            <button className=" m-auto hover:opacity-80 duration-300 transition-all">
              <img src={send} className="w-5  opacity-75" alt="" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Project;
