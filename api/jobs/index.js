const { Router } = require("express");
const controller = require("./jobController");
const router = new Router();

router.get("/", controller.getList);
router.get("/locations", controller.getLocations);
router.get("/technologies/:technology", controller.searchByTechnology);
router.get("/keywods/:keyword", controller.searchByKeyword);
router.get("/types/:type", controller.searchByType);

module.exports = router;
