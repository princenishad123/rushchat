import { generateJwt } from "../lib/generate.jwt.js";
import { comparePassword, hashPassword } from "../lib/hash.password.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js"
export const signupController = async (req, res) => {
    let {fullname,email,password} = req.body
    try {

        // simple validation
        if (!email || !password || !fullname) return res.status(400).json({
            message:"All field is Required !"
        })

        // check password it be 6 char
        if (password < 6) return res.status(400).json({ message: "password must be 6 charectors" });
    

        const user = await User.findOne({ email });

     // check is exist or not
        if (user) return res.status(400).json({
            message: "Email is already Exist"
        });

        password = await hashPassword(password);

        const newUser = new User({ fullname, email, password });

        if (newUser) {
          await  generateJwt(newUser._id, res);
               await newUser.save()
            res.status(201).json({
                message: "Successfully sign up",
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
            
        } else {
            res.status(400).json({message:"Invalid user data"})
        }





  } catch (error) {
    console.log(`error in Signup ${error}`)
  }
}



export const loginController = async (req, res) => {
    const {email,password} = req.body
    try {

        if (!email || !password) return res.status(400).json({ message: "all field are required " });
        if (password < 6) return res.status(400).json({ message: "Password must be 6 charector" });
        
        // check user are exist yes or not

        const user = await User.findOne({ email })
        
        if (!user) return res.status(400).json({ message: "Invalid Email or Password" });
        
        // if(!User) return res.status(400).json({ message: "Invalid Email or Password" });

        const passwordMatch = await comparePassword(password, user.password);

        if (!passwordMatch) return res.status(400).json({ message: "Invalid Email or Password" });
        
         generateJwt(user._id, res);

       return res.status(200).json({
           message: "Login success",
           id:user._id,
            fullname: user.fullname,
            email: user.email,
            profilePic:user.profilePic
        })


        
    } catch (error) {
        console.log(`erron in login : ${error.message}`)
    }
   
}
export const logoutController = (req, res) => {
   try {
       res.cookie("jwt", "", {
          maxAge:0
       })
       
       return res.status(200).json({
           message:"your are log out"
       })
   } catch (error) {
       console.log(`error in logout : ${error.message}`)
       res.status(400).json({message:"internal server error"})
   }
}



export const updateProfile = async (req, res) => {
    const {profilePic} = req.body

    try {
            
        if(!profilePic) return res.status(400).json({message:"profile photo not provide"})
        const userId = req.user._id;
        
        const uploadRes = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadRes.secure_url }, { new: true })
        
       return res.status(200).json({updatedUser})


    } catch (error) {
        console.log(`error in update profile picture ${error}`)
    }
    
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log(`error in check auth ctrl`)
    }
}