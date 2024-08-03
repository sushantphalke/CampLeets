const express = require("express");
const axios = require("axios")
const cors = require("cors");
const router = require("./Routes/index");
const cron = require("node-cron");
const {User} = require("./db")
const {LEETCODE_API} = require("./config")
// Function to update LeetCode data
async function updateLeetCodeData() {
    try {
      const users = await User.find({});
      
      for (let user of users) {
        const response = await axios.get(`${LEETCODE_API}/${user.username}`);
        console.log(response.data.totalSolved);
        await User.updateOne({ _id: user._id }, { $set: { 
            problems : response.data.totalSolved,
            easy : response.data.easySolved,
            medium : response.data.mediumSolved,
            hard: response.data.hardSolved } });
      }
  
      console.log('LeetCode data updated successfully.');
    } catch (error) {
      console.error('Error updating LeetCode data:', error);
    }
  }
  
  // Schedule the task to run every hour
cron.schedule('0 * * * *', () => {
    console.log('Running LeetCode data update...');
    updateLeetCodeData();
});
const app=express();
app.use(cors());
app.use(express.json());
console.log("index.js");
app.get('/helloword',(req,res)=>{
    res.send("hello world");
})

app.use("/api/v1/",router);

app.listen(2000,()=>{
    console.log("server listening on 2000");
})