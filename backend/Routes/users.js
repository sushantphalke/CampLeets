const {Router} = require("express");
const router =Router();
const { LEETCODE_API, JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const {User} = require("./../db")
const axios = require("axios");
const authMiddleware = require("../middleware");

router.get('/bulk',authMiddleware, async(req,res)=>{
    const filter=req.query.filter||"";
    const users = await User.find({
        $or: [
            { username: { $regex: filter, $options: 'i' } }, // 'i' for case-insensitive search
            { firstName: { $regex: filter, $options: 'i' } },
            { lastName: { $regex: filter, $options: 'i' } }
        ]
    }).select('-__v -password ');
   // console.log(users);
    res.send(users);
})
router.post("/signin",async(req,res)=>{
    const user = await User.findOne({username : req.body.username,password : req.body.password});
    if(!user)
    {
        return res.status(411).json({
            message : "Error while loggin in"
        })
    }
    const token = jwt.sign({username : user.username},JWT_SECRET);
    res.json({
            token: token
        });
})
router.post('/signup', async (req,res)=>{
    const username=req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const user = await User.findOne({username});
    if(user)
    {
        return res.status(411).json({
            message :"User already present"
        })
    }
    const response = await axios.get(LEETCODE_API+username);
    if(response.data.errors)
    {
        return res.status(411).json({
            message :"Username does not exist"
        })
    }
    const newUser =await User.create({
        firstName : firstName,
        lastName : lastName,
        username:username,
        problems : response.data.totalSolved,
        easy : response.data.easySolved,
        medium : response.data.mediumSolved,
        hard: response.data.hardSolved,
        password : password
    })
    //onsole.log(newUser);
    const token = jwt.sign({userId : newUser._id},JWT_SECRET);
    res.json({
            message : "User created succesfully",
            token: token
        });
})

router.delete("/",async (req,res)=>{
    try {
        await User.deleteOne({ username : req.body.username });
        console.log('User deleted successfully');
        return res.send("user deleted successfully")
      } catch (err) {
        console.error('Error deleting the user:', err);
        return res.status(411).json({
            message :"delete was unsuccesfull"
        })
      }
})

module.exports = router