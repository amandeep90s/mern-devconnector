const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const { readdirSync } = require("fs");
require("events").EventEmitter.prototype._maxListeners = 100;

// App initialization
const app = express();

// Configuration
require("dotenv").config();

// Body parser middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(cors());

// Database connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(`Database error : ${error}`));

// passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
readdirSync("./routes/api").map((r) =>
    app.use("/api", require("./routes/api/" + r))
);

// Port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
