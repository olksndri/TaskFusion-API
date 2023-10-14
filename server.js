const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);

require("dotenv").config();

const app = require("./app");

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT || 3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.log(`Server isn't running. Error message: ${err.message}`);
    process.exit(1);
  });
