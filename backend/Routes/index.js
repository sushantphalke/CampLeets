const {Router} = require("express");
const router =Router();
const userRouter = require("./users");
const cohortRouter = require("./cohort");

router.use("/user",userRouter);
router.use("/cohort",cohortRouter);

module.exports = router