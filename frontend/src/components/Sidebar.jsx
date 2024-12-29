import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserSkeleton from "./UserSkeleton";
import { useAuthStore } from "../store/useAuthCheck";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Sidebar = () => {
  const {
    users,
    messages,
    getUsers,
    isUserLoading,
    setSelectedUser,
    selectedUsers,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div
      className="flex flex-col justify-start items-center gap-y-1"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div className="md:hidden w-full">
        <Navbar />
      </div>
      {/* add some style here */}
      {isUserLoading ? (
        <UserSkeleton />
      ) : (
        users.map((user) => (
          <button
            onClick={() => setSelectedUser(user)}
            key={user?._id}
            className={`w-full h-auto flex justify-start items-center  gap-4 p-2 hover:bg-base-150 ${
              selectedUsers?._id === user._id ? "bg-base-200" : ""
            }`}
          >
            <div
              className={`avatar ${
                onlineUsers.includes(user?._id) ? "online" : "offline"
              }`}
            >
              <div className="md:w-16 w-10 rounded-full">
                <img src={user?.profilePic} />
              </div>
            </div>
            <div>
              <h2 className="text-md font-semibold leading-5">
                {user?.fullname}
              </h2>
              <span className="text-sm text-gray-700 text-start block">
                {onlineUsers.includes(user?._id) ? "online" : "offline"}
              </span>
            </div>
          </button>
        ))
      )}
    </div>
  );
};

export default Sidebar;
