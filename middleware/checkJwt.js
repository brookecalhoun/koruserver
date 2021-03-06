const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

const checkJwt = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: false,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-96jkcqer.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://koru-server.herokuapp.com/api/journal',
    issuer: 'https://dev-96jkcqer.us.auth0.com/',
    algorithms: ['RS256']
})
module.exports = checkJwt