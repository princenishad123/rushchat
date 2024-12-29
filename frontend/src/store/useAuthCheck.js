import { Navigate, useNavigate } from "react-router-dom"
import {io} from "socket.io-client"
import { axiosInstance } from "../lib/axios"
import { create } from "zustand"
import {toast} from 'react-hot-toast'
const BASE_URL = import.meta.env.VITE_MODE === "production" ? "http://localhost:3000/api/v1" : "/"
export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isLogingIn: false,
    isUpdating:false,
    authChecking: true,
    isLoading: false,
    isUploadingImage: false,
    socket: null,
    onlineUsers:[],
    
    checkAuth: async () => {
       
    try {
        const res = await axiosInstance.get("/auth/check-auth")
     
        set({ authUser: res.data })
           get().connectSocket()
        
    } catch (error) {
        console.log(`error in check auth : ${error}`)
        set({ authUser: null })   
        
    } finally {
        set({ authChecking: false })

    }
    },

    signUp: async (data) => {
            set({isLoading:true})
        try {

            const res = await axiosInstance.post("/auth/signup", data)
            if (res) set({ isLoading: false })
            set({authUser:res.data})
             toast.success(res.data.message)
           get().connectSocket()
            
        } catch (error) {
          
            set({ isLoading: false })
             toast.success(error.response.data.message)
            
        } finally {
             set({isLoading:false})
        }
    },


    logOut: async () => {
        try {
            set({authUser:null})
            const res = await axiosInstance.post("/auth/logout")
            toast.success("log out success")
           get().disconnectSocket()
        } catch (error) {
             toast.error(error.response.data.message)
             set({isLoading:false})
        }
    },


       login: async (data) => {
            set({isLoading:true})

        try {

            const res = await axiosInstance.post("/auth/login", data)
            if (res) set({ isLoading: false })
            set({authUser:res.data})
            toast.success(res.data.message)
           get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
             set({isLoading:false})
        } finally {
             set({isLoading:false})
        }
    },
       
    connectSocket: () => {
        const { authUser } = get()
        
        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {
            query: {
                userId:authUser?._id
            }
        })
        
        socket.connect()

        set({ socket: socket });

        socket.on("getOnlineUsers", (usersIds) => {

            // console.log(usersIds)
            set({ onlineUsers: usersIds })
            
            
        })
       },
    disconnectSocket: () => {
           if(get().socket?.connected) socket.disconnect()
       },
       
       
    uploadImage: async (profileImage) => {
        set({ isUploadingImage: true });

        try {
            const res = await axiosInstance.put("/auth/update-profile", profileImage);

            if(res) toast.success(res.data.message)
            set({authUser:res.data})
        } catch (error) {
            console.log(`error in uploading image ${error}`)
     

        } finally {
            set({isUploadingImage:false})
        }
           
       }
}))