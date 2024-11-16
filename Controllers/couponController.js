const Coupon = require('../Models/Coupon');

const createCoupon = async (req, res) => {
    try {
        const { code, discountType, discountValue, minimumPurchase, expiryDate, isActive } = req.body;
        
        const newCoupon = new Coupon({
            code,
            discountType,
            discountValue,
            minimumPurchase,
            expiryDate,
            isActive,
        });

        await newCoupon.save();
        res.status(201).json({ message: 'Coupon created successfully', coupon: newCoupon });
    } catch (error) {
        console.error('Error creating coupon:', error);
        res.status(500).json({ message: 'Error creating coupon' });
    }
};

const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    } catch (error) {
        console.error('Error fetching coupons:', error);
        res.status(500).json({ message: 'Error fetching coupons' });
    }
};

const getCouponById = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await Coupon.findById(id);

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        res.status(200).json(coupon);
    } catch (error) {
        console.error('Error fetching coupon:', error);
        res.status(500).json({ message: 'Error fetching coupon' });
    }
};

const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedCoupon = await Coupon.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedCoupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        res.status(200).json({ message: 'Coupon updated successfully', coupon: updatedCoupon });
    } catch (error) {
        console.error('Error updating coupon:', error);
        res.status(500).json({ message: 'Error updating coupon' });
    }
};

const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;

        const coupon = await Coupon.findByIdAndDelete(id);

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        res.status(200).json({ message: 'Coupon deleted successfully' });
    } catch (error) {
        console.error('Error deleting coupon:', error);
        res.status(500).json({ message: 'Error deleting coupon' });
    }
};

module.exports = { createCoupon, getAllCoupons, getCouponById, updateCoupon, deleteCoupon};
