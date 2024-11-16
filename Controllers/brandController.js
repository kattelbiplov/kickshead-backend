const cloudinary = require("../Config/cloudinaryConfig");
const Brand = require("../Models/Brand");
const streamifier = require('streamifier')

const createBrand = async (req, res) => {
    try {
      const file = req.file;
  
      if (!file) {
        return res.status(400).json({ message: "No logo image uploaded" });
      }
  
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "brands",  
          resource_type: "auto", 
        },
        async (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            return res.status(500).json({ message: "Error uploading to Cloudinary" });
          }
  
          
          if (!result || !result.secure_url) {
            return res.status(500).json({ message: "Failed to get image URL from Cloudinary" });
          }
  
          console.log("Cloudinary upload result:", result);

          const brand = new Brand({
            name: req.body.name,
            logo: result.secure_url, 
          });
  
         
          await brand.save();
  
         
          res.status(201).json({
            message: "Brand created successfully",
            brand,
          });
        }
      );
  
      
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
  
    } catch (error) {
      console.error("Error creating brand:", error);
      res.status(500).json({ message: "Error creating brand" });
    }
  };

const listBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ message: "Error fetching brands" });
  }
};


const updateBrand = async (req, res) => {
  const { id } = req.params;
  try {
    let updatedData = { name: req.body.name };

    
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.buffer, {
        folder: "brands",
      });
      updatedData.logo = result.secure_url; 
    }

    const updatedBrand = await Brand.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({
      message: "Brand updated successfully",
      updatedBrand,
    });
  } catch (error) {
    console.error("Error updating brand:", error);
    res.status(500).json({ message: "Error updating brand" });
  }
};


const deleteBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    console.error("Error deleting brand:", error);
    res.status(500).json({ message: "Error deleting brand" });
  }
};

module.exports = {
  createBrand,
  listBrands,
  updateBrand,
  deleteBrand,
};
