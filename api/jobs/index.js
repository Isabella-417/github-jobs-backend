const { Router } = require("express");
const controller = require("./jobController");
const router = new Router();

router.get("/", controller.getList);
router.get("/places", controller.getLocations);
router.get("/technologies/:technology", controller.searchByTechnology);
router.get("/keywods/:keyword", controller.searchByKeyword);
router.get("/types", controller.searchByType);
router.get("/locations", controller.searchByLocation);
module.exports = router;
