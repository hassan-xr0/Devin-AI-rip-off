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
    <main className="h-screen ">
      <div className="w-[25vw] flex flex-col   h-screen">
        {/* --------- header ------ */}
        <div className="p-4 bg-slate-300 flex justify-between items-center">
          <h1 className=" text-2xl capitalize font-medium">{project.name}</h1>
          <button className="hover:opacity-80 duration-300 transition-all">
            {" "}
            <img src={group} className="w-5 " alt="" />
          </button>
        </div>
        {/*---- message area ----- */}
        <div className=" message-area bg-[url(src/assets/chat-bg.png)] bg-contain flex-grow flex flex-col">
          {/* ---messages --- */}
          <div className="messages flex-grow">
            <div className="incoming-msg bg-slate-400 text-slate-950 p-3 mb-3 mt-7 ml-2 max-w-[75%] rounded-md mr-auto">
              <p className='text-sm opacity-75'>email@example.com</p>
              <p className="text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, quo!</p>
            </div>
            <div className="your-msg bg-slate-300  p-3 mr-2 max-w-[75%] rounded-md ml-auto">
              <p className='text-sm opacity-75 '>email@example.com</p>
              <p className="text-base">Lorem ipsum dolor sit !</p>
            </div>
          </div>
          {/* ---input feild --- */}
          <div className="inputflex bg-slate-300 text-slate-900 w-full  justify-between items-center px-3 py-1   ">
            <input
              type="text"
              placeholder="Message"
              className="w-[90%] h-full py-3 px-3 bg-transparent text-lg  text-[#3d3b39] outline-none"
            />
            <button className="w-[10%] m-auto hover:opacity-60 duration-300 transition-all">
              <img src={send} className="w-5  " alt="" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Project;
