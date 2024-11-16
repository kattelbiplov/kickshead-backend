const express = require("express");
const { createBrand, listBrands, updateBrand, deleteBrand} = require("../Controllers/brandController");
const authenticateToken = require("../Middlewares/auth");
const checkAdminRole = require("../Middlewares/checkAdminRole");
const multer = require("multer");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create-brand", authenticateToken, checkAdminRole, upload.single("logo"), createBrand);
router.get("/view-brands", listBrands);
router.put("/edit-brand/:id", authenticateToken, checkAdminRole,upload.single("logo"), updateBrand);
router.delete("/delete-brand/:id", authenticateToken, checkAdminRole, deleteBrand);

module.exports = router;
