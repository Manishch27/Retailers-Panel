import bcrypt from "bcrypt"
import User from "./user.model.js";
import jwt from "jsonwebtoken";


const createUser = async (req, res, next) => {

    const {name, username, password} = req.body;


    // validation

    if (!name || !username || !password) {
        return next(new Error('All fields are required'));
    }

    // database call

    try {
     
        const user = await User.findOne({username});

    if (user) {
        return next(new Error('User already exist with this username', 400));
    }
        
    } catch (error) {
        return next( new Error('errr while getting user', 500));
        
    }

    // password hashing

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;

    try {

        newUser = await User.create({
            name,
            username,
            password: hashedPassword,
        });

    } catch (error) {
        return next(new Error('Error while hashing password', 500));
        
    }

    try {
        
         // JWT token generation

    const token = jwt.sign({
        sub: newUser._id
    },
    process.env.JWT_SECRET,

    { expiresIn: '1h' }
)
 

    // response

    res.json({
        accessToken : token,
    })

    } catch (error) {

        return next(new Error('Error while generating token', 500));

    }


}

export { createUser };