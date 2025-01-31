import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import upload from "../assets/uplaod.svg";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] text-neutral-300">
      <div className="w-full max-w-2xl bg-[#2F2F2F] rounded-lg shadow-xl overflow-hidden">
        
        <header className="bg-[#212121] text-2xl text-center p-6">
          <h1>Welcome to CodeBot</h1>
        </header>
        
        <div className="p-4 h-96 overflow-y-auto">
          <div className="space-y-4">
            <div className={`flex `}>
              <div className={`max-w-xs p-3 rounded-lg `}>
                <p>---</p>
              </div>
            </div>
          </div>
        </div>

        
        <div className="flex items-center p-4 bg-[#212121] ">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="w-full p-3 rounded-lg bg-[#2F2F2F]  focus:outline-none focus:ring-2 focus:ring-indigo0"
          />
          <button className="ml-3 p-2 bg-[#2F2F2F] text-white rounded-full hover:bg-slate-3">
            <img className="opacity-30 w-6 " src={upload} alt="" />
          
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
