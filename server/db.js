const mongoose = require('mongoose');


module.exports = async () => {
    try{
        const dbUri = process.env.DB;
        
        if (!dbUri){
            throw new Error("DB connection string not defined in environment variables.");   
        }

        await mongoose.connect(dbUri);
        console.log("MongoDB Connected");
    } catch(error){
        console.error("Could not connect to the database", error);
    }
;
}