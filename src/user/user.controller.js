const createUser = async (req, res, next) => {

    const {name, username, password} = req.body;


    // validation

    if (!name || !username || !password) {
        return next(new Error('All fields are required'));
    }

    // process

    // response

    res.json({
        message: 'User registered successfully',
    })

}

export { createUser };