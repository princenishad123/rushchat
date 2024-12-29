import React from "react";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";
import Chats from "../components/Chats";
import NoChatSelected from "../components/NoChatSelected";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  const { messages, selectedUsers } = useChatStore();
  return (
    <div
      className="max-w-7xl mx-auto  border-l flex gap-4 relative"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div
        className={`sm:w-96 w-full  max-md:fixed z-50  bg-white ${
          selectedUsers ? "max-md:-left-[100%]" : "max-md:left-0"
        } `}
      >
        <Sidebar />
      </div>
      <div className="no-scrollbar w-full border content-center max-md:max-h-auto max-md:h-screen overflow-y-scroll">
        {!selectedUsers ? <NoChatSelected /> : <Chats />}
      </div>
    </div>
  );
};

export default HomePage;
