const express = require('express');
const {createCoupon, getAllCoupons, getCouponById, updateCoupon, deleteCoupon} = require('../Controllers/couponController');
const authenticateToken = require("../Middlewares/auth");
const checkAdminRole = require("../Middlewares/checkAdminRole");
const router = express.Router();

router.post('/create-coupon/',authenticateToken, checkAdminRole, createCoupon); 
router.get('/view-coupons', getAllCoupons);
router.get('/view-coupon/:id', getCouponById); 
router.put('/edit-coupon/:id',authenticateToken, checkAdminRole, updateCoupon); 
router.delete('/delete-coupon/:id', authenticateToken, checkAdminRole,deleteCoupon); 

module.exports = router;
