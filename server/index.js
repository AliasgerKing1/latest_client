require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')
const KJUR = require('jsrsasign')
const axios = require('axios')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json(), cors())
app.options('*', cors())

app.post('/', async (req, res) => {
  const meetingNumber = '83356998877'; // Replace with your actual meeting number

const apiKey = 'TQkzoP8MSQOOE0YaY_2fbg';
const apiSecret = 'mOxIcpXsoSLu9E6Ldz61rJ7MQNZDyNQ3';

const generateAccessToken = async () => {
  const clientID = 'TQkzoP8MSQOOE0YaY_2fbg';
const clientSecret = 'mOxIcpXsoSLu9E6Ldz61rJ7MQNZDyNQ3';
const redirectURI = 'http://localhost:3000/oauth/callback'; // Replace with your app's redirect URI

// Step 1: Redirect the user to Zoom's authorization page
app.get('/oauth', (req, res) => {
  const zoomAuthURL = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}`;
  res.redirect(zoomAuthURL);
});

// Step 2: Handle the callback from Zoom after user grants or denies permission
app.get('/oauth/callback', async (req, res) => {
  const authorizationCode = req.query.code;
  
  if (!authorizationCode) {
    return res.status(400).send('Authorization code missing');
  }

  // Step 3: Exchange the authorization code for an access token
  try {
    const tokenResponse = await axios.post('https://zoom.us/oauth/token', querystring.stringify({
      grant_type: 'authorization_code',
      code: authorizationCode,
      redirect_uri: redirectURI,
    }), {
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = tokenResponse.data.access_token;
    console.log(accessToken)

    // You should securely store this access token for future API requests

    // res.send(`Access Token: ${accessToken}`);
  } catch (error) {
    console.error('Error exchanging authorization code for access token:', error);
    res.status(500).send('Error exchanging authorization code for access token');
  }
});

//   const token = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

//   try {
//     const response = await axios.post('https://zoom.us/oauth/token', null, {
//       headers: {
//         Authorization: `Basic ${token}`,
//       },
//       params: {
//         grant_type: 'client_credentials',
//       },
//     });

//     const accessToken = response.data.access_token;
    
//   let data = await axios.get(`https://api.zoom.us/v2/metrics/meetings/${meetingNumber}/participants`, {
//     headers: {
//       'Authorization': `Bearer ${accessToken}`
//     }
//   });
//   console.log(data);
//   // console.log('Access Token:', accessToken);
//   return accessToken;
// } catch (error) {
//   console.error('Error generating access token:', error);
// }
};

generateAccessToken();
// res.json({
//   res: data.data, // Use `data.data` to get the response data from the Axios request.
// });
});

app.listen(port, () => console.log(`Zoom Meeting SDK Auth Endpoint Sample Node.js listening on port ${port}!`))



//   // Set the SharedArrayBuffer-related headers before sending the response
//   res.set('Cross-Origin-Opener-Policy', 'same-origin');
//   res.set('Cross-Origin-Embedder-Policy', 'require-corp');
//   res.set('Cross-Origin-Resource-Policy', 'cross-origin');