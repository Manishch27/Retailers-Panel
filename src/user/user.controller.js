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

    res.status(201).json({
        accessToken : token,
    })

    } catch (error) {

        return next(new Error('Error while generating token', 500));

    }


}

const loginUser = async (req, res, next) => {
    
    const {username, password} = req.body;

    // validation

    if (!username || !password) {
        return next(new Error('All fields are required', 400));
    }

    let user = null;

    try {
        user = await User.findOne({username});

        if (!user) {
            return next(new Error('User not found', 404));
        }
    } catch (error) {
        return next(new Error('Error while finding user', 500));
    }

    // password matching

    try {
        // password matching
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
            return next(new Error('Username or password incorrect', 400));
        }
    
        // JWT token generation
        const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        next(error);
    }

}

export { createUser, loginUser };