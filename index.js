require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 7001;
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorhandler");
const router = require("./routes/index");
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET_KEY,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use("/", express.static(__dirname + "/"));
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is listening on PORT: ${port}`);
});
