const { Router } = require("express");
const controller = require("./job.controller");
const router = new Router();

router.get("/", controller.getList);
router.get("/places", controller.getLocations);
router.get("/stacks", controller.getStacks);
router.get("/filters", controller.searchByQuery);
module.exports = router;
