const checkRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)){
            return res.status(403).json({message: "Sorry, you are not authorized."})
        }
        next();
    }
}

module.exports = checkRole;