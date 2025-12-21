import bcrypt from "bcrypt";
const saltRounds = 10;
async function  passwordHashing(password)
{
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword;

}

async function comparePassword(plainPassword, hashedPassword){
    
    const compare = await bcrypt.compare(plainPassword, hashedPassword)
    return compare
    // console.log("compare", compare);
    // console.log("hashed Password :", hashedPassword)
    // console.log("plain Password :", plainPassword)

}

export  {passwordHashing, comparePassword}