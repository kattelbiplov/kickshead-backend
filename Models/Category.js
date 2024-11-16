const mongoose = require("mongoose");


const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true, 
    },
    description: {
      type: String,
      trim: true, 
    },
    slug: {
      type: String,
      unique: true, 
      lowercase: true,
    },
  },
  { timestamps: true } 
);

// Auto slug generator
CategorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().split(" ").join("-");
  }
  next();
});

module.exports = mongoose.model("Category", CategorySchema);
