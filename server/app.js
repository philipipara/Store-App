
let mongoose = require("mongoose");
let express = require("express");
let  app = express();
let bodyParser = require("body-parser");
let cors = require("cors");
let cookeParser = require("cookie-parser");

//My Routes
let authRoutes = require("./routes/auth");
let userRoutes = require("./routes/user");
let categoryRoutes = require("./routes/category");
let productRoutes = require("./routes/product");
let orderRoutes = require("./routes/order");






    //Db connect
    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/shirtstore",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(() => {
      console.log("DB CONNECTED")
  }).catch(
      console.log("OOOPS")
  )

  //middleware
  app.use(bodyParser.json());
  app.use(cors());
  app.use(cookeParser());

  //Routes
  app.use("/api", authRoutes);
  app.use("/api", userRoutes);
  app.use("/api", categoryRoutes);
  app.use("/api", productRoutes);
  app.use("/api", orderRoutes);


  //port
  const PORT = process.env.PORT || 8000;

  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });