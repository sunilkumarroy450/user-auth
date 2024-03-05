const mongoose = require("mongoose");
const connection_uri = process.env.MONGO_URI;

const connection = mongoose.createConnection(connection_uri, {
  useNewUrlParser: true, //This part helps in understanding the connection details you provide for the MongoDB database
  useUnifiedTopology: true, //This part is about how your application talks to the MongoDB server.
});

connection.on("error", (error) => {
  console.log("Error in database", error);
});

connection.once("open", () => {
  console.log("Connected to Database");
});

exports.connection = connection;
