var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-96jkcqer.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "http://localhost:4000",
  issuer: "https://dev-96jkcqer.us.auth0.com/",
  algorithms: ["RS256"],
});

module.exports = checkJwt;
