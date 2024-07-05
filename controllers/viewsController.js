const User = require("../models/User");
const Medicament = require("./../models/Medicament");
const Supplier = require("./../models/Supplier");
const Order = require("./../models/Order");
const Sale = require("../models/Sale");

exports.getSignup = (req, res) => {
  res.status(200).render("signup");
};

exports.getLogin = (req, res) => {
  res.status(200).render("login");
};

exports.getOverview = (req, res) => {
  res.status(200).render("base");
};

exports.getPharmacistDashboard = (req, res) => {
  res.status(200).render("pharmacistDashboard");
};

exports.getManageDocuments = (req, res) => {
  res.status(200).render("manageMedicaments");
};

exports.getAllMedicaments = async (req, res) => {
  const medicaments = await Medicament.find();
  res.status(200).render("allMedicaments", {
    medicaments,
  });
};

exports.getOneMedicament = async (req, res) => {
  const medicament = await Medicament.findById(req.params.id);
  const action = req.url.split("/")[3];
  res.status(200).render("getOneMedicament", { medicament, action });
};

exports.createOneMedicament = (req, res) => {
  res.status(200).render("createMedicament");
};

exports.getManagerDashboard = (req, res) => {
  res.status(200).render("managerDashboard");
};

exports.getManageStock = (req, res) => {
  res.status(200).render("manageStock");
};

exports.getManageSuppliers = async (req, res) => {
  const suppliers = await Supplier.find();
  res.status(200).render("manageSuppliers", { suppliers });
};

exports.getOneSupplier = async (req, res) => {
  const supplierID = req.params.id;
  const supplier = await Supplier.findById(supplierID);
  console.log(supplier);
  res.status(200).render("getOneSupplier", { supplier });
};

exports.getModifySupplier = async (req, res) => {
  const supplierID = req.params.id;
  const supplier = await Supplier.findById(supplierID);
  res.status(200).render("getModifySupplier", { supplier });
};

exports.getCreateSupplier = (req, res) => {
  res.status(200).render("createSupplier");
};

exports.getManageSellers = async (req, res) => {
  const sellers = await User.find({ role: "seller" });
  res.status(200).render("manageSellers", { sellers });
};

exports.getOneSeller = async (req, res) => {
  const seller = await User.findById(req.params.id);
  res.status(200).render("getOneSeller", { seller });
};

exports.getCreateSeller = (req, res) => {
  res.status(200).render("createSeller");
};

exports.getManageOrders = async (req, res) => {
  const orders = await Order.find();
  res.status(200).render("manageOrders", { orders });
};

exports.getOneOrder = async (req, res) => {
  const order = await Order.findById(req.params.id).populate("supplier");
  res.status(200).render("getOneOrder", { order });
};

exports.getCreateOrder = async (req, res) => {
  const suppliers = await Supplier.find();
  res.status(200).render("createOrder", { suppliers });
};

exports.getModifyOrder = async (req, res) => {
  const suppliers = await Supplier.find();
  const order = await Order.findById(req.params.id);
  console.log(order);
  res.status(200).render("getModifyOrder", { suppliers, order });
};

exports.getSellerDashboard = (req, res) => {
  res.status(200).render("sellerDashboard");
};

exports.getCreateSale = (req, res) => {
  res.status(200).render("getCreateSale");
};

exports.getFreeSale = (req, res) => {
  res.status(200).render("getFreeSale");
};

exports.getCloseFreeSale = (req, res) => {
  const medicaments = [];
  medicaments.length = req.params.medNumber;
  res.status(200).render("getCloseFreeSale", { medicaments });
};

exports.getOrdonnanceSale = (req, res) => {
  res.status(200).render("getCloseOrdonnanceSale");
};

exports.sales = (req, res) => {
  res.status(200).render("sales");
};

exports.viewSales = async (req, res) => {
  const sales = await Sale.find();
  res.status(200).render("viewSales", { sales });
};

exports.getCloseOrdonnanceSale = async (req, res) => {
  const medicaments = req.params.data.split("&");
  res.status(200).render("makeOrdonnanceSale", { medicaments });
};

exports.getOrdonnanceTypes = (req, res) => {
  res.status(200).render("ordonnanceTypes");
};

exports.getOrdonnanceSaleOrdinaire = (req, res) => {
  res.status(200).render("getOrdonnanceSaleOrdinaire");
};

exports.getCloseOrdonnanceOrdinaireSale = (req, res) => {
  const medicaments = [];
  medicaments.length = req.params.medNumber;
  res.status(200).render("getCloseOrdonnanceOrdinaireSale", { medicaments });
};

exports.getSaleGros = (req, res) => {
  res.status(200).render("salesGros");
};

exports.createSaleGros = (req, res) => {
  res.status(200).render("createSaleGros");
};

exports.getModifySeller = async (req, res) => {
  const seller = await User.findById(req.params.id);
  res.status(200).render("getModifySeller", { seller });
};
