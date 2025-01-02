const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        costPrice: {
            type: Number,
            required: true
        },
        sellingPrice:{
            type:Number,
            required:true,
        },
        quantity: {
            type: Number,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand',
            required: true
        },
        images: [String],
        slug: {
            type: String,
            unique: true
        },
    },
    {
        timestamps: true
    });


// Auto slug generator
productSchema.pre("save", function (next) {
    if (this.isModified("name")) {
      this.slug = this.name.toLowerCase().split(" ").join("-");
    }
    next();
  });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
