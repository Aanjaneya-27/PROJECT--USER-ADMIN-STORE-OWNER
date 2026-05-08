const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const {registerUser, LoginUser , getStores} = require('../controller/userController');
const verifyToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');


router.post('/register', registerUser);
router.post('/login', LoginUser);
router.get( '/stores',verifyToken,getStores);

router.get("/all-users", verifyToken, checkRole("admin"), async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.status(200).json(result.rows);
    } catch (err) {
        console.log("ALL USERS ERROR:", err.message);
        res.status(500).json({ message: err.message });
    }
});

router.get("/all-ratings", verifyToken, checkRole("admin"), async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM ratings");
        res.status(200).json(result.rows);
    } catch (err) {
        console.log("ALL RATINGS ERROR:", err.message);
        res.status(500).json({ message: err.message });
    }
});

router.get("/owner-ratings", verifyToken, checkRole("owner"), async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM ratings");
        res.status(200).json(result.rows);
    } catch (err) {
        console.log("OWNER RATINGS ERROR:", err.message);
        res.status(500).json({ message: err.message });
    }
});

router.get('/user', verifyToken,checkRole('user'), (req, res) => {res.json({message: "Welcome User"})})
router.get('/admin', verifyToken,checkRole('admin'), (req, res) => {res.json({message: "Welcome Admin"})})
router.get('/owner', verifyToken,checkRole('owner'), (req, res) => {res.json({message: "Welcome Owner"})})

router.get('/profile', verifyToken, (req, res) => {
    res.status(200).json({message: "Route Access", user: req.user})
})


module.exports = router;