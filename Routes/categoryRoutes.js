const express = require("express");
const { createCategory, listCategories, updateCategory, deleteCategory } = require("../Controllers/categoryController");
const authenticateToken = require("../Middlewares/auth");
const checkAdminRole = require("../Middlewares/checkAdminRole");

const router = express.Router();

router.post("/create-category", authenticateToken, checkAdminRole, createCategory);
router.get("/view-category", listCategories);
router.put("/edit-categiry/:id", authenticateToken, checkAdminRole, updateCategory);
router.delete("/delete-category/:id", authenticateToken, checkAdminRole, deleteCategory);

module.exports = router;
