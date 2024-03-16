const express = require("express");
const mongodb = require("./data/database.js");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 4000;
 
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Origin",
    "Origin, x-Requested-With, Content-Type, Accept, Accept z-key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();  // Tells the app to go to the next middleware.
});

// After processing the previous middleware, the next() tells it 
// move on to the next middleware

app.use("/", require("./routes"))

mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port, () =>
        console.log(`Database is listening and node Running on port: ${port}`)
      );
    }
  });
  
