const mongoose = require("mongoose");

const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/journallib";
console.log(process.env.MONGODB_URI);
const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(connectionString, configOptions)
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

mongoose.connection.on("connected", () => {
  console.log(
    `Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}`
  );
});
module.exports = {
  Journal: require("./Journal").Journal,
  User: require("./User"),
};
