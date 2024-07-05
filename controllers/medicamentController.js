const catchAsync = require("../utils/catchAsync");
const Medicament = require("./../models/Medicament");

// GET ALL MEDICAMENTS
exports.getAllMedicaments = catchAsync(async (req, res) => {
  const medicaments = await Medicament.find();
  res.status(200).json({
    status: "succcess",
    results: medicaments.length,
    data: { medicaments },
  });
});

// CREATE A MEDICAMENT
exports.createMedicament = catchAsync(async (req, res) => {
  const newMedicament = await Medicament.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      newMedicament,
    },
  });
});

// DELETE ALL MEDICAMENTS
exports.deleteAllMedicaments = catchAsync(async (req, res) => {
  await Medicament.deleteMany();
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// DELETE ONE MEDICAMENT
exports.deleteOneMedicament = catchAsync(async (req, res) => {
  await Medicament.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// MODIFY MEDICAMENT
exports.modifyMedicament = catchAsync(async (req, res) => {
  const medicamentModified = await Medicament.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(200).json({
    status: "success",
    medicamentModified,
  });
});
