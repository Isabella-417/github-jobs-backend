const { Router } = require("express");
const controller = require("./jobController");
const router = new Router();

router.get("/", controller.getList);

module.exports = router;
