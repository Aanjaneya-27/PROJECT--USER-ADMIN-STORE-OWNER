const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
       try { 
        const authToken = req.headers.authorization;
        console.log("HEADER:", authToken);
         if ( !authToken ||!authToken.startsWith("Bearer ")) 
            {

            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const token = authToken.split(" ")[1];

        console.log("TOKEN:", token);

        console.log(
            "SECRET:",
            process.env.JWT_SECRET
        );

        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODE:", decode);

        req.user = decode;

        next();

    } catch (error) {

        console.log(
            "JWT ERROR:",
            error.message
        );

        res.status(401).json({
            message: "Unauthorized"
        });
    }
};

module.exports = verifyToken;