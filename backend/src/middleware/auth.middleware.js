import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectedRoute = async (req, res, next) => {
    try {       
        const token = req.cookies['jwt'];

        if (!token) return res.status(400).json({ message: "Unauthorized no token provided " })
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        
        if (!decoded) return res.status(400).json({ message: "Unauthorized Invalid Token " })
        
        const user = await User.findById(decoded.userId).select("-password")

        if (!user) return res.status(400).json({ message: "user not found" });

        req.user = user

        next()

        
        
        
        
        
    } catch (error) {
        console.log(`error in protected route verify jwt : ${error.message} `)
    }
    
}