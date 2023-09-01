var axios = require("axios").default;
var clientId = process.env.CLIENTID;
var clientSecret = process.env.SECRET_KEY;
var clientIdentifier = process.env.IDENTIFIER

var options = {
  method: 'POST',
  url: 'https://localhost:7001/oauth/token',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    audience: clientIdentifier
  })
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});