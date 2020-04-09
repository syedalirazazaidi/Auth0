const express = require("express");
require("dotenv").config(); //authomatically give acces to envirnment varaible
const app = express();
const jwt = require("express-jwt");
const jwkRsa = require("jwks-rsa");
const checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header
    // and the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true, // cache the signing key
      rateLimit: true,
      jwksRequestsPerMinute: 5, // prevent attackers from requesting more than 5 per minute
      jwksUri: `https://${
        process.env.REACT_APP_AUTH0_DOMAIN
      }/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  
    // This must match the algorithm selected in the Auth0 dashboard under your app's advanced settings under the OAuth tab
    algorithms: ["RS256"]
  });
app.get("/public", function (req, res) {
  res.json({
    message: "hello from API",
  });
});
app.get("/private",checkJwt, function (req, res) {
    res.json({
      message: "hello from API",
    });
  });
app.listen(3001);
console.log("API Server listenig" + process.env.REACT_APP_AUTH0_AUDIENCE);
