import bcrypt from 'bcrypt'

const saltRounds = 10;

const hashPassword = async (password: string) => {

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error : hashing password", error)
        } else {
            throw new Error("Failed to hash password")
        }
    }
}
export default hashPassword