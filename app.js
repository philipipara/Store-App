
require('dotenv').config({ path: 'env file path' })

let mongoose = require("mongoose");
let express = require("express");
let  app = express();
let bodyParser = require("body-parser");
let cors = require("cors");
let cookieParser = require("cookie-parser");
let path = require('path');



//My Routes
let authRoutes = require("./routes/auth");
let userRoutes = require("./routes/user");
let categoryRoutes = require("./routes/category");
let productRoutes = require("./routes/product");
let orderRoutes = require("./routes/order");
let stripeRoute = require("./routes/stripepayment");






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
  app.use(cookieParser());

  //Routes
  app.use("/api", authRoutes);
  app.use("/api", userRoutes);
  app.use("/api", categoryRoutes);
  app.use("/api", productRoutes);
  app.use("/api", orderRoutes);
  app.use("/api", stripeRoute);
  
  

  //port
  const PORT = process.env.PORT || 8000;

  if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
    app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });