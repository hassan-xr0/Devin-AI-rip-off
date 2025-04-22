import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import group from "../assets/group.svg";
import send from "../assets/send.svg";

import member from "../assets/member.png";
import arrowback from "../assets/arrowback.svg";
import menu from "../assets/menu.svg";

const Project = () => {
  const location = useLocation();
  const project = location.state.project;
  const [isOpen, setIsOpen] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  const [isAddMemberModal, setIsAddMemberModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  
  // Mock users data - replace with your actual users data
  const [users, setUsers] = useState([
    { id: 1, name: "User 1", email: "user1@example.com" },
    { id: 2, name: "User 2", email: "user2@example.com" },
    { id: 3, name: "User 3", email: "user3@example.com" }
  ]);

  const navigate = useNavigate();

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    setIsAddMemberModal(false);
  };

  return (
    <main className="h-screen ">

      <div className="w-[25vw] flex flex-col h-screen">
        {/* --------- header ------ */}
        <div className="p-4 bg-slate-200 border-b-[1px] border-slate-300 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="hover:opacity-80 duration-300 transition-all"
            >
              {" "}
              <img src={arrowback} className="w-5 invert " alt="" />
            </button>

            <h1 className=" text-2xl capitalize font-medium">{project.name}</h1>
          </div>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="hover:opacity-80 duration-300 transition-all"
          >
            {" "}
            <img src={group} className="w-5 " alt="" />
          </button>

          {/*----- member-section ---- */}
          <div
            className={`flex-col flex bg-slate-200 absolute h-screen z-10 w-[25vw] -left-[480px] top-0 duration-500 transition-all ${
              isOpen ? "translate-x-[480px]" : ""
            }`}
          >
            {/* --- member-header -- */}
            <div className="p-4 border-b-[1px] border-slate-300 flex justify-between items-center">
              <div className="flex items-center gap-5">
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="hover:opacity-80 duration-300 transition-all"
                >
                  {" "}
                  <img src={arrowback} className="w-5 invert " alt="" />
                </button>

                <h1 className=" text-2xl capitalize font-medium">
                  {project.name}
                </h1>
              </div>
              <button
                onClick={() => {
                  setIsMenu(true);
                }}
                className="hover:opacity-80 duration-300 transition-all"
              >
                {" "}
                <img src={menu} className="w-5 invert " alt="" />
              </button>

              {/* ----- setting-modal ----- */}
              <div
                className={`absolute bg-white shadow-lg max-w-[202px] top-[20px] left-[260px] rounded-xl  ${
                  isMenu ? "flex" : "hidden"
                }`}
              >


                <ul className="settings flex-col flex text-base font-semibold">
                  <li 
                    className="border-b-[1px] border-zinc-300 py-3 px-2 flex gap-2 cursor-pointer hover:bg-slate-100"
                    onClick={() => setIsAddMemberModal(true)}
                  >
                    Add Member
                  </li>


                  <li className="py-3 px-2 flex gap-3 cursor-pointer hover:bg-slate-100">Remove Member</li>
                  <li className="border-t-[1px] border-zinc-300 py-3 px-2 cursor-pointer hover:bg-slate-100">
                    Delete Workspace
                  </li>
                </ul>
              </div>
              
                            </div>
              
              {/* User Selection Modal */}
              <div className={`absolute bg-white shadow-lg w-[300px] top-[60px] left-[260px] rounded-xl p-4 ${isUserModalOpen ? 'block' : 'hidden'}`}>
                <h2 className="text-lg font-semibold mb-4">Select User</h2>
                <div className="max-h-[300px] overflow-y-auto">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setIsUserModalOpen(false);
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-slate-100 rounded-lg cursor-pointer transition-all duration-300"
                    >




                      ×
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => handleUserSelect(user.id)}
                        className="p-3 hover:bg-slate-100 cursor-pointer rounded-lg mb-2"
                      >
                        <div className="flex items-center gap-3">
                          <img src={member} className="w-10 h-10 rounded-full" alt="" />
                          <div>
                            <h3 className="font-medium">{user.name}</h3>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </div>


                    ))}
                  </div>
                </div>
              </div>


            )}

            {/* ----- member-list ----- */}
            <div className="flex-grow ">
              <div className="members-list flex gap-2 flex-col mx-3 mt-10">
                <div className="member flex gap-5  p-2 items-center">
                  <img src={member} className="w-12 rounded-full" />
                  <div className="">
                    {" "}
                    <p className="text-sm font-medium opacity-60 leading-[10px]">
                      example@gmail.com
                    </p>
                    <h1 className="text-lg font-semibold opacity-90">
                      {" "}
                      username
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*---- message area ----- */}
        <div className=" message-area bg-[url(src/assets/chat-bg.png)] bg-contain flex-grow flex flex-col">
          {/* ---messages --- */}
          <div className="messages flex-grow">
            <div className="incoming-msg bg-slate-400 text-slate-950 p-3 mb-3 mt-7 ml-2 max-w-[75%] rounded-md mr-auto">
              <p className="text-sm opacity-75">email@example.com</p>
              <p className="text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ducimus, quo!
              </p>
            </div>
            <div className="your-msg bg-slate-300  p-3 mr-2 max-w-[75%] rounded-md ml-auto">
              <p className="text-sm opacity-75 ">email@example.com</p>
              <p className="text-base">Lorem ipsum dolor sit !</p>
            </div>
          </div>
          {/* ---input feild --- */}
          <div className="inputflex bg-slate-200 border-t-zinc-400 border-[1px]   w-full  justify-between items-center px-3 py-1   ">
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
