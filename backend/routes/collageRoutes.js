const express = require("express");
const router = express.Router();
const collageController = require("../controllers/collageController");

router.get("/",        collageController.getUserCollages);  // GET ?userId=xxx
router.get("/:id",     collageController.getCollageById);
router.post("/",       collageController.createCollage);
router.put("/:id",     collageController.updateCollage);
router.delete("/:id",  collageController.deleteCollage);

module.exports = router;