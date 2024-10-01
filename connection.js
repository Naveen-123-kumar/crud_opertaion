// const mongoose = require("mongoose");

// async function connectMongoDb(url) {
//   return mongoose
//     .connect(url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => console.log("MongoDB connected"))
//     .catch((err) => console.log("error", err));
// }

// module.exports = { connectMongoDb };

const mongoose = require("mongoose");

let dbConnection = null;

async function connectMongoDb(url) {
  dbConnection = await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected");
      return mongoose.connection;
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      throw err;
    });
  return dbConnection;
}

module.exports = { connectMongoDb };
