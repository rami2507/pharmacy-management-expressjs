const express = require("express");
const viewsController = require("./../controllers/viewsController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.get("/signup", viewsController.getSignup);
router.get("/login", viewsController.getLogin);

router.use(authController.isLoggedIn);

// ******************  PHARMACIST ROLES  ******************
router.get("/pharmacistDashboard", viewsController.getPharmacistDashboard);
router.get("/manage-medicaments", viewsController.getManageDocuments);
router.get(
  "/manage-medicaments/all-medicaments",
  viewsController.getAllMedicaments
);
router.get(
  "/manage-medicaments/all-medicaments/delete/:id",
  viewsController.getOneMedicament
);
router.get(
  "/manage-medicaments/all-medicaments/modify/:id",
  viewsController.getOneMedicament
);
router.get(
  "/manage-medicaments/create-medicament",
  viewsController.createOneMedicament
);

// ******************  MANAGER ROLES  ******************
router.get("/managerDashboard", viewsController.getManagerDashboard);
// STOCK
router.get("/manage-stock", viewsController.getManageStock);
// SUPPLIERS
router.get("/manage-suppliers", viewsController.getManageSuppliers);
router.get("/manage-suppliers/add-supplier", viewsController.getCreateSupplier);
router.get("/manage-suppliers/:id", viewsController.getOneSupplier);
router.get("/manage-suppliers/modify/:id", viewsController.getModifySupplier);
// SELLERS
router.get("/manage-sellers", viewsController.getManageSellers);
router.get("/manage-sellers/add-seller", viewsController.getCreateSeller);
router.get("/manage-sellers/:id", viewsController.getOneSeller);
router.get("/manage-sellers/modify/:id", viewsController.getModifySeller);
// ORDERS TO SUPPLIERS
router.get("/manage-orders", viewsController.getManageOrders);
router.get("/manage-orders/make-order", viewsController.getCreateOrder);
router.get("/manage-orders/:id", viewsController.getOneOrder);
router.get("/manage-orders/modify/:id", viewsController.getModifyOrder);
// SALES 'GROS'
router.get("/sale-gros", viewsController.getSaleGros);
router.get("/create-sale-gros", viewsController.createSaleGros);

// ******************  SELLER ROLES  ******************
router.get("/sellerDashboard", viewsController.getSellerDashboard);
router.get("/sales", viewsController.sales);
router.get("/view-sales", viewsController.viewSales);
router.get("/create-sale", viewsController.getCreateSale);
router.get("/create-sale/ordonnance/types", viewsController.getOrdonnanceTypes);
router.get(
  "/create-sale/ordonnance-sale/ordinaire",
  viewsController.getOrdonnanceSaleOrdinaire
);
router.get(
  "/create-sale/ordinaire-sale/:medNumber",
  viewsController.getCloseOrdonnanceOrdinaireSale
);
router.get("/create-sale/free-sale", viewsController.getFreeSale);
router.get(
  "/create-sale/free-sale/:medNumber",
  viewsController.getCloseFreeSale
);
// QR CODE
router.get("/create-sale/ordonnance", viewsController.getOrdonnanceSale);
router.get("/medicaments/:data", viewsController.getCloseOrdonnanceSale);

module.exports = router;
