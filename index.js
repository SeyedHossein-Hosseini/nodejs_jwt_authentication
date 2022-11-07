const express = require("express");

// these routes refers to signup and login get and post methods
const authRoutes = require("./routes/authRoutes");

const mongoose = require("mongoose");

const dotenv = require('dotenv');

const cookieParser = require('cookie-parser');

const { handleUserAuth, checkUser } = require('./middleware/authenticateUserByToken');

const app = express();

dotenv.config({ path: './config/.env' });

app.use(express.static("public"));

app.use(express.json());

app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", "views");


app.get("*", checkUser);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/main", handleUserAuth, (req, res) => {
  res.render("main");
});



// app.get("/set-cookie", (req, res) => {
//   res.cookie('isUser', 'yesssss');
//   res.cookie('isDeveloper', 'ofCourse', {
//     maxAge: 1000 * 100,
//     secure: false,
//     httpOnly: true
//   });
//   res.render("cookie");
// });

// app.get("/get-cookie", (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);
//   res.json(cookies);
// });




app.use(authRoutes);

const dbURI = process.env.STRING_CONNECTION_MONGODB;

PORT = process.env.PORT;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
  })
  .then(
    (result) => {
      console.log("Connected");
      app.listen(PORT, console.log(`app is running on PORT ${PORT}`));
    }
  )
  .catch((err) => console.log(err));

