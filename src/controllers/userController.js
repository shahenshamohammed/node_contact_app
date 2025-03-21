const asyncHandler = require('express-async-handler')
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jsonWebToken = require("jsonwebtoken")
const { json } = require('express')

//@desc Register a user
//@desc POST /users/register
//@desc access public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {

        res.status(400);
        throw new Error("All fields are mandotary")
    }

    const userAvailable = await User.findOne({ email })

    if (userAvailable) {

        res.status(400);
        throw new Error("user already exists")
    }


    //hash password 
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password", hashedPassword)


    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    console.log("user created", user)

    if (user) {

        res.status(201).json({ _id: user.id, email: user.email })
    } else {

        res.status(400)
        throw new Error("user data not valid")

    }
    // res.json({message: "register the user"})
})

//@desc Login a user
//@desc POST /users/login
//@desc access public

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required")
    }


    const user = await User.findOne({ email })
    //compare password with hashedpassword
    if (user && await bcrypt.compare(password, user.password)) {

        const accessToken = jsonWebToken.sign({

            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },

        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })

        res.status(200).json({accessToken})

    }else {

        res.status(401)
        throw new Error("email or password  is not valid")
    }


 
})

//@desc current user information
//@desc GET /users/current
//@desc access private

const currentUser = asyncHandler(async (req, res) => {



    res.json(req.user)
})

module.exports = { registerUser, loginUser, currentUser }