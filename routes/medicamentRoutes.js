const express = require("express");
const router = express.Router();
const medicamentController = require("./../controllers/medicamentController");

// GET ALL MEDICAMENTS
router.get("/allMedicaments", medicamentController.getAllMedicaments);

// CREATE A MEDICAMENT
router.post("/createMedicament", medicamentController.createMedicament);

// DELETE ALL MEDICAMENTS
router.delete(
  "/deleteAllMedicaments",
  medicamentController.deleteAllMedicaments
);

// DELETE ONE MEDICAMENT
router.delete(
  "/deleteMedicament/:id",
  medicamentController.deleteOneMedicament
);

// MODIFY ONE MEDICAMENT
router.patch("/modifyMedicament/:id", medicamentController.modifyMedicament);

module.exports = router;
