const router = require("express").Router();
const {User, validate} = require("../models/user.js");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try{    
        console.log("Request body:" , req.body);


        //check if the user enters valid data
        const {error} = validate(req.body);
        if (error){
            console.log("Validation error: ", error.details[0].message);
            return res.status(400).send({message: error.details[0].message});
        }

        //check if the user already exists
        const user = await User.findOne({email: req.body.email});
        if (user){
            console.log('User already exists: ', user);
            return res.status(409).send({message: 'User already exists with the given email id!'});
        }

        //Hash password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        console.log("Salt Generated: ", salt);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        console.log('Password hashed successfully');

        //save the data to the database
        await new User({...req, password: hashPassword}).save();
        console.log("User created successfully");

        //send response
        res.status(201).send({message: "User created successfully"});
    } catch (error){
        console.log('Error in /api/users:', error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;

