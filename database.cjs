const mongoose = require("mongoose");

/**
 * @author Cory Lillis
 */

mongoose.connect("mongodb://localhost:27017/map").catch((error) => {
    console.log(error)
});

const userSchema = new mongoose.Schema({
    username: String,
    hash: String
});
// const pointSchema = new mongoose.Schema({
//     x: Number,
//     y: Number
// });
const trailSchema = new mongoose.Schema({
    creator: String,
    x1: Number,
    y1: Number,
    x2: Number,
    y2: Number
});

const UserModel = mongoose.model("users", userSchema);
const TrailModel = mongoose.model("trails", trailSchema);

// Get a user by username
async function getUser(username)
{
    try
    {
        return await UserModel.findOne({ username });
    }
    catch(error)
    {
        console.log(error);
        return 0;
    }
}

// Insert a new user into the database
async function insertUser(newUser)
{
    try
    {
        const user = await UserModel.create(newUser);
        return user;
    }
    catch(error)
    {
        console.log(error)
        return null;
    }
}

// Insert a new trail for a user
async function insertTrail(newTrail)
{
    try
    {
        const user = await TrailModel.create(newTrail);
        return user;
    }
    catch(error)
    {
        console.log(error)
        return null;
    }
}

async function getTrails(username)
{
    try
    {
        return await TrailModel.find({ creator: username });
    }
    catch(error)
    {
        console.log(error);
        return 0;
    }
}

module.exports = {
    getUser,
    insertUser,
    insertTrail,
    getTrails
};

