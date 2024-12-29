import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthCheck";
export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUsers: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });

    try {
      const res = await axiosInstance.get("/messages/users");

      if (res) set({ users: res.data });
    } catch (error) {
      console.log(`error in get User ${error}`);
      toast.error("not found users");
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(`error in get messages by id ${error}`);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUsers, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send-message/${selectedUsers._id}`,
        messageData
      );
      set({ messages: [...messages, messageData] });
    } catch (error) {
      toast.error("invalid ");
    }
  },

  getToMessages: () => {
    const { selectedUsers } = get();
    if (!selectedUsers) return;
    const socket = useAuthStore.getState().socket;

    socket.on("newMessages", (data) => {
      const isMessageSentFromSelectedUser = data.senderId === selectedUsers._id;

      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, data],
      });
    });
  },

  getFromMessage: () => {
    const socket = useAuthStore.getState().socket;

    socket.off("newMessages");
  },

  setSelectedUser: (selectedUser) => set({ selectedUsers: selectedUser }),
}));
