const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    logo: { 
        type: String, 
        required: true 
    },
  },
  { timestamps: true }
);

// Auto slug generator
BrandSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().split(" ").join("-");
  }
  next();
});

module.exports = mongoose.model("Brand", BrandSchema);
