const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const  { findUser,createUser }   = require("../models/userModel");

const registerUser = async (req, res) => {

    try {

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const address = req.body.address;
        const role = req.body.role;


        // check empty fields
        if (!name || !email || !password || !address) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (name.length < 5 || name.length > 60) {

            return res.status(400).json({
                success: false,
                message: "Name must be between 5 and 60 characters"
            });
        }

        if (address.length > 400) {

            return res.status(400).json({
                success: false,
                message: "Address should not exceed 400 characters"
            });
        }

        const emailCheck = /^\S+@\S+\.\S+$/;

        if (!emailCheck.test(email)) {

            return res.status(400).json({
                success: false,
                message: "Please enter a valid email"
            });
        }

        const passwordCheck =
            /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

        if (!passwordCheck.test(password)) {

            return res.status(400).json({
                success: false,
                message:
                    "Password must be 8-16 characters "
            });
        }

        const user = await findUser(email);

        if (user) {

            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            name,
            email,
            password: hashedPassword,
            address,
            role
        };

        const newUser = await createUser(userData);

        res.status(201).json({
            success: true,
            message: "User registered successfully",

            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {

        console.log("Register Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const LoginUser = async (req, res) => {
   try{
       const email = req.body.email;
       const password = req.body.password;

       if (!email || !password) {
        res.status(400).json({message: "Email and password are required"});
       }
       const user = await findUser(email)
       if(!user) {
        return res.status(400).json({message: "Invalid email or password"});
       }
       const isMatch = await bcrypt.compare(password, user.password)
       if(!isMatch){
        return res.status(400).json({message: "Invalid email or password"});
       }
       const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "5d"})
       res.status(200).json({message: "Login successful", token, user: {id: user.id, name: user.name, email: user.email, role: user.role}})

   }catch(err){
         console.log("Login Error:", err.message);
        res.status(500).json({message: "Server error"});
   }
}


const getStores = async (req, res) => {
    try {
        const stores = await pool.query("SELECT * FROM stores");
        res.json(stores.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
};

module.exports = {registerUser, LoginUser, getStores};