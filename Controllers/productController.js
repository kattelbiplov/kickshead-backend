const Product = require('../Models/Product');
const cloudinary = require('../Config/cloudinaryConfig');
const streamifier = require("streamifier")

const createProduct = async (req, res) => {
    try {
      const files = req.files; 
  
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No images uploaded" });
      }
      const imageUrls = [];
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) {
              console.error("Error uploading to Cloudinary:", error);
              return res.status(500).json({ message: "Error uploading to Cloudinary" });
            }
  
            if (!result || !result.secure_url) {
              return res.status(500).json({ message: "Failed to get image URL from Cloudinary" });
            }
  
            imageUrls.push(result.secure_url);
           
            if (imageUrls.length === files.length) {
              const { name, description, price, stock, categoryId, brandId } = req.body;
  
              
              const product = new Product({
                name,
                description,
                price,
                stock,
                category: categoryId,
                brand: brandId,
                images: imageUrls, 
              });
  
            product.save();
  
              res.status(201).json({
                message: "Product created successfully",
                product,
              });
            }
          }
        );
  
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Error creating product" });
    }
  };


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category').populate('brand');
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};


const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category').populate('brand');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId, brandId } = req.body;
    const images = req.files;
    const productId = req.params.id;

    if (!name || !description || !price || !categoryId || !brandId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let imageUrls = product.images;  
    if (images && images.length > 0) {
      imageUrls = [];
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i].path, { folder: 'products' });
        imageUrls.push(result.secure_url);
      }
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.category = categoryId;
    product.brand = brandId;
    product.images = imageUrls;

    await product.save();
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    for (let i = 0; i < product.images.length; i++) {
      const publicId = product.images[i].split('/').pop().split('.')[0]; 
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    await product.remove();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};


module.exports = {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct}