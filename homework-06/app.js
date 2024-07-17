// homework-06/app.js

const mongoose = require("mongoose");
require("dotenv").config();

const express = require("express");
const app = express();
const contactRoutes = require("./routes/contacts.routes");
const authRoutes = require("./routes/auth.routes");
const emailRoutes = require("./routes/email.routes");
const setupDirectories = require("./services/directorySetup");

const PORT = process.env.PORT || 3000;

const connection = mongoose.connect(process.env.DATABASE_URL, {
  //   dbName: "db-contacts",
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

app.use(express.json());
require("./config/passport");

app.use("/api/v1", contactRoutes, emailRoutes);
app.use("/api/v1/users", authRoutes);

connection
  .then(async () => {
    console.log("Database connection successful");
    await setupDirectories();
    app.listen(PORT, async () => {
      console.log(`App listens on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error while establishing connection ${error}`);
    process.exit(1);
  });
