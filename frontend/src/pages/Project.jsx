import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { useLocation, useNavigate } from "react-router-dom";
import group from "../assets/group.svg";
import send from "../assets/send.svg";
import close from "../assets/close.svg";
import member from "../assets/member.png";
import arrowback from "../assets/arrowback.svg";
import menu from "../assets/menu.svg";


const Project = () => {
  const location = useLocation();
  const project = location.state.project;
  const [isOpen, setIsOpen] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [selectUserModal, setSelectUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);


  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
      
    axios.get('user/all').then(res=>{
      setUsers(res.data.users)
    }).catch(err=>{
      console.log(err)
    })
  
    }, [])
    

  const handleUserSelection = (user) => {
    setSelectedUserId([...selectedUserId,user])
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
                    onClick={() => {
                      setSelectUserModal(true);
                      setIsMenu(false);
                    }}
                  >
                    Add Member
                  </li>

                  <li className="py-3 px-2 flex gap-3 cursor-pointer hover:bg-slate-100">
                    Remove Member
                  </li>
                  <li className="border-t-[1px] border-zinc-300 py-3 px-2 cursor-pointer hover:bg-slate-100">
                    Delete Workspace
                  </li>
                </ul>
              </div>
            </div>

            {/* User Selection Modal */}
            {isOpen && (
              <div
                className={`absolute bg-white shadow-xl  w-[350px] top-[150px] left-[720px] rounded-xl p-4 ${selectUserModal ? "block" : "hidden"}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold mb-4">Select User</h2>
                  <img
                    onClick={() => {
                      setSelectUserModal(false);
                    }}
                    src={close}
                    className="w-5 invert cursor-pointer"
                    alt=""
                  />
                </div>
                <div className="max-h-[350px] overflow-y-auto">
                  {users.map((user) => (
                    <div
                      key={user._id}
                      onClick={() => { handleUserSelection(user._id);}}
                      className={`flex items-center gap-3 p-2 m-1 hover:bg-slate-300 rounded-lg cursor-pointer transition-all duration-300 ${selectedUserId.includes(user._id) ? "bg-slate-300" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={member}
                          className="w-10 h-10 rounded-full"
                          alt=""
                        />
                        <div>

                          <h1 className="text-medium text-gray-900">{user.email}</h1>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <button className="py-3 px-7 rounded-lg text-white bg-slate-950">Add</button>
                </div>
              </div>
            )}

            {/* ----- member-list ----- */}
            <div className="flex-grow ">
              <div className="members-list flex gap-2 flex-col mx-3 mt-10">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="member flex gap-5  p-2 items-center"
                  >
                    <img src={member} className="w-12 rounded-full" />
                    <div className="">
                      {" "}
                      <h1 className="text-xl font-semibold opacity-90">
                        {user.email}
                      </h1>
                    </div>
                  </div>
                ))}
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
