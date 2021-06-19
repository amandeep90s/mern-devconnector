const app = require("express")();
const mongoose = require("mongoose");

const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const users = require("./routes/api/users");

// configuration
require("dotenv").config();

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

// Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
