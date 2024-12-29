import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.js";
import UserMessage from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(`error in find users ctrl : ${error}`);
  }
};
export const getMessages = async (req, res) => {
  const { id: toChatUserId } = req.params;
  const myId = req.user._id;
  try {
    const messages = await UserMessage.find({
     $or: [
        { senderId: myId, recieverId: toChatUserId },
        { senderId: toChatUserId, recieverId: myId },
      ],
    });
    return res.status(200).json(messages);
  } catch (error) {
    console.log(`error while get message : ${error}`);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image);

        imageUrl = uploadRes.secure_url;
      }
      
      const newMessage = new UserMessage({
          senderId,
          recieverId,
          text,
          image:imageUrl
      })

    await newMessage.save()
    
    const recieverSocketId = getRecieverSocketId(recieverId);



    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessages",newMessage)
    }
       res.status(201).json({
        
          newMessage
      })
  } catch (error) {
    console.log(`error in send message : ${error}`);
  }
};
