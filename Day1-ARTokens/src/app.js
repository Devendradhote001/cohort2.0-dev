let express = require("express");
let cookieParser = require("cookie-parser");
let cors = require("cors");
let authRoutes = require("./routes/auth.routes");
let homeRoutes = require("./routes/home.routes");

let app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);

module.exports = app;
