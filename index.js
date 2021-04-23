require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// my module
const { dbConnection } = require("./config/config");

// config
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));
app.use(morgan("dev"));

// end points
app.use("/user", require("./routes/userRoute"));

app.get("/", (req, res) => {
	res.json({ msg: "You are welcome!" });
});

// database connection
dbConnection();

// app listen
app.listen(process.env.PORT, () => {
	console.log(`App is listening at: http://localhost:${process.env.PORT}`);
});
