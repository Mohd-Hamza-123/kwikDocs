import bcrypt from 'bcrypt'

const saltRounds = 10;

const hashPassword = async (password: string) => {

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword
    } catch (error) {
        console.log(error)
        return null
    }

}
export default hashPassword