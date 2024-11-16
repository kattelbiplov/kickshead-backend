const cloudinary = require("cloudinary").v2;
require("dotenv").config();


cloudinary.config({
  cloud_name: "dyzsktmyd", 
  api_key: "979774716782625",  
  api_secret: "FHMy6HtiA6Xc4mRLgg0RKvIewnU",  
});

module.exports = cloudinary;
