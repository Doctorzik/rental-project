const express = require("express");
const mongodb = require("./data/database.js");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const githubStrategy = require("passport-github2").Strategy;
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const port = process.env.PORT || 4000;
 
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

//Basic express session initialization
app.use(passport.initialize());
//Allow passport to use express session
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Headers",
    "Origin, x-Requested-With, Content-Type, Accept, Accept z-key, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH,  OPTIONS, DELETE"
  );
  next(); // Tells the app to go to the next middleware.
});
// After processing the previous middleware, the next() tells it
// move on to the next middleware
app.use(
  cors({ methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"] })
);
app.use(cors({ origin: "*" }));

app.use("/", require("./routes/index.js"));

passport.use(
  new githubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile)
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
      // }); 
    }
  )
);
 
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {

  res.send(
   
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.username}`
      : "Logged Out"
  );
});

app.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/api-docs" }),
  function (req, res) {
    req.session.user = req.user;

    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
mongodb.initDb((err) => {
  if (err) {
    console.log(`I am in ${err}`);
  } else {
    app.listen(port, () =>
      console.log(`Database is listening and node Running on port: ${port}`)
    );
  }
});
   