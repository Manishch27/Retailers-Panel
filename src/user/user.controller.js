import bcrypt from "bcrypt"
import User from "./user.model.js";
import jwt from "jsonwebtoken";


const createUser = async (req, res, next) => {

    const { name, username, password } = req.body;

    // validation

    if (!name || !username || !password) {
        return next(new Error('All fields are required'));
    }

    // database call

    try {

        const user = await User.findOne({ username });

        if (user) {
            return next(new Error('User already exist with this username', 400));
        }

    } catch (error) {
        return next(new Error('errr while getting user', 500));

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
            accessToken: token,
        })

    } catch (error) {

        return next(new Error('Error while generating token', 500));

    }


}

const loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
        return next(new Error('All fields are required', 400));
    }

    let user = null;

    try {
        user = await User.findOne({ username });

        if (!user) {
            return next(new Error('User not found', 404));
        }
    } catch (error) {
        return next(new Error('Error while finding user', 500));
    }

    // Password matching
    try {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(new Error('Username or password incorrect', 400));
        }

        // JWT token generation
        const token = jwt.sign(
            { sub: user._id, admin: user.admin }, // Include admin status in the token payload
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            admin: user.admin, // Include admin status in the response
            id: user._id,
            name: user.name
        });
    } catch (error) {
        next(error);
    }
};


const getAllRetailers = async (req, res, next) => {
    try {
        const retailers = await User.find({ admin: false });
        res.status(200).json(retailers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch retailers' });
    }
}

const updateRetailer = async (req, res, next) => {
    const { id } = req.params;
    const { name, username, password, tokens } = req.body;
    try {
        const updatedData = { name, username, tokens };
        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }
        await User.findByIdAndUpdate(id, updatedData);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
}

const deleteRetailer = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
}

const addToken = async (req, res) => {
    const { id } = req.params;
    const { tokens } = req.body;
    try {
        const user = await User.findById(id);
        user.tokens += tokens;
        await user.save();
        res.status(200).json({ message: 'Tokens added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add tokens' });
    }
}



export { createUser, loginUser, getAllRetailers, updateRetailer, deleteRetailer, addToken };