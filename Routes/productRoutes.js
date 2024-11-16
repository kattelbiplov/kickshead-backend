const express = require('express');
const multer = require('multer');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../Controllers/productController');
const authenticateToken = require("../Middlewares/auth");
const checkAdminRole = require("../Middlewares/checkAdminRole");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



router.post('/create-product', authenticateToken, checkAdminRole, upload.array('images'), createProduct);
router.get('/view-products', getAllProducts);
router.get('/view-product/:id', getProductById);
router.put('/edit-product/:id',authenticateToken, checkAdminRole, upload.array('images'), updateProduct);
router.delete('/delete-product/:id',authenticateToken, checkAdminRole, deleteProduct);

module.exports = router;
