import React, { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import InputMessage from "./InputMessage";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthCheck";
import { convertCreatedAtToIST } from "../lib/utils";

const Chats = () => {
  const {
    getMessages,
    messages,
    selectedUsers,
    isMessagesLoading,
    getToMessages,
    getFromMessage,
  } = useChatStore();

  const { authUser } = useAuthStore();

  const chatContainerRef = useRef(null);
  useEffect(() => {
    getMessages(selectedUsers._id);
    getToMessages();

    return () => getFromMessage();
  }, [selectedUsers._id, getMessages, getToMessages, getFromMessage]);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages, getToMessages]);

  return (
    <div
      className="no-scrollbar w-full flex flex-col justify-between relative
      "
      // style={{ height: "calc(98vh - 64px)" }}
    >
      <ChatHeader />
      <div
        ref={chatContainerRef}
        className="no-scrollbar w-full  h-[80vh]  overflow-y-scroll relative px-4 flex flex-col gap-4 justify-start scroll-smooth "
      >
        {messages.map((sms, index) => (
          <div
            key={index}
            className={`chat ${
              selectedUsers?._id === sms?.senderId ? "chat-start" : "chat-end"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={
                    selectedUsers?._id === sms?.senderId
                      ? selectedUsers?.profilePic
                      : authUser?.profilePic
                  }
                />
              </div>
            </div>

            <div
              className={`chat-bubble ${
                selectedUsers?._id === sms?.senderId
                  ? "bg-slate-800 font-semibold"
                  : "bg-green-800 font-semibold"
              }`}
            >
              {sms?.image && (
                <div className="chat-header size-24 overflow-hidden">
                  <img src={sms?.image} className="object-contain" alt="" />
                </div>
              )}
              {sms?.text}
            </div>

            <div className="chat-footer opacity-50">
              <span>{convertCreatedAtToIST(sms?.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 z-10 py-4 bg-white ">
        <InputMessage />
      </div>
    </div>
  );
};

export default Chats;
