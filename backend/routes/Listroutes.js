const express = require("express");
const {Add , Getlist, deletetask, Updatetask, GetBYid} = require("../controllers/ListController");

const router = express.Router();

router.route("/add").post(Add);
router.route("/lists").get(Getlist)
router.route("/:id").delete(deletetask).put(Updatetask).get(GetBYid);


module.exports = router;