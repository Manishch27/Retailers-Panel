import User from "./user.model.js";

const createUser = async (req, res, next) => {

    const {name, username, password} = req.body;


    // validation

    if (!name || !username || !password) {
        return next(new Error('All fields are required'));
    }

    // database call

    const user = await User.findOne({username});

    if (user) {
        return next(new Error('User already exist with this username'));
    }

    // process

    // response

    res.json({
        message: 'User registered successfully',
    })

}

export { createUser };