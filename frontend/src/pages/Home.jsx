import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import add from "../assets/add.svg";

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModal, setIsModal] = useState(false);
  const createProject = (e)=>{
    e.preventDefault()
    console.log('Project created !')
  }

  return (
    <main className="">
      {isModal && (
        <div className="h-screen w-screen backdrop-blur-lg absolute flex justify-center items-center">
          <div className=" modal bg-white p-4 rounded-md w-[350px] flex flex-col gap-4 min-h-[180px]">
            <h1 className="font-semibold text-2xl text-zinc-900">
              Create New Project
            </h1>
            <form onSubmit={createProject} className="space-y-3">
              <label className="text-black">Project name</label>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 rounded-md bg-[#dadada]"
                required
              />
            </form>
            <div className="flex gap-2 justify-end">
              <button className="bg-zinc-900  px-4 py-2 rounded-md w-[30%]">
                Create
              </button>
              <button
                className="bg- text-black px-4 py-2  border-black border-2 rounded-md w-[30%]"
                onClick={() => {
                  setIsModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="projects p-4">
        <button
          className="p-4 rounded-md bg-[#eeee] text-black flex items-center gap-2"
          onClick={() => {
            setIsModal(true);
          }}
        >
          <span className="font-semibold">Add Project</span>
          {!isModal && <img src={add} className=" opacity0 w-5" />}
        </button>
      </div>
    </main>
  );
};

export default Home;
