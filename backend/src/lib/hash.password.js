import bcrypt from "bcrypt"

export const hashPassword = async (password) => {
const salt = 10
  return await bcrypt.hash(password.toString(),salt)
    
}

export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password,hashedPassword)
}