// homework-04/app.js

const mongoose = require("mongoose");
require("dotenv").config();

const express = require("express");
const app = express();
const contactRoutes = require("./routes/contacts.routes");
const authRoutes = require("./routes/auth.routes");

const PORT = process.env.PORT || 3000;

const connection = mongoose.connect(process.env.DATABASE_URL, {
  //   dbName: "db-contacts",
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

app.use(express.json());
require("./config/passport");

app.use("/api/v1", contactRoutes);
app.use("/api/v1/users", authRoutes);

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, async () => {
      console.log(`App listens on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error while establishing connection ${error}`);
    process.exit(1);
  });
