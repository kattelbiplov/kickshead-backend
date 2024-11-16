const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(require("cors")());

app.use("/api/users", require("./Routes/userRoutes"));
app.use("/api/categories", require("./Routes/categoryRoutes"));
app.use("/api/brands", require("./Routes/brandRoutes"));
app.use("/api/products", require("./Routes/productRoutes"));
app.use("/api/coupons",require("./Routes/couponRoutes"));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
