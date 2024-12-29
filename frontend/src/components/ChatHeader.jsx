import React from "react";
import { useChatStore } from "../store/useChatStore";
import { HiMiniXMark } from "react-icons/hi2";
import { useAuthStore } from "../store/useAuthCheck";

const ChatHeader = () => {
  const { selectedUsers, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="w-full h-auto flex justify-between px-4 py-3 bg-transparent backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <div className="size-10 overflow-hidden rounded-full">
          <img src={selectedUsers.profilePic} alt={selectedUsers.fullname} />
        </div>
        <div>
          <h2 className="text-md font-semibold leading-5">
            {selectedUsers.fullname}
          </h2>
          <span className="text-sm">
            {onlineUsers.includes(selectedUsers?._id) ? "online" : "offline"}
          </span>
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)}>
        <HiMiniXMark size={25} />
      </button>
    </div>
  );
};

export default ChatHeader;
