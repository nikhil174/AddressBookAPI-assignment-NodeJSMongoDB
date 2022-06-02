const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

// const port = process.env.PORT || 5000;

port = 5000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);

app.use(errorHandler);

//connect to server
app.listen(port, () => console.log(`Server started on port ${port}`));
