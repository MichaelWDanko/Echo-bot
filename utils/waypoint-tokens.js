const jwt = require('jsonwebtoken');
const axios = require('axios');

const secretKey = 'your-secret-key';
const useragent = 'your-user-agent';

function generate_access_token(claims) {
  const token = jwt.sign(claims, secretKey, { algorithm: 'HS256' });
  return token;
}

async function get_public_key(kid) {
  const response = await axios.get('https://userpresence.svc.halo.gg/prod/keyservice/v1/keys');
  const keys = response.data.keys;
  const key = keys.find(key => key.kid === kid);
  if (!key) {
    throw new Error(`Could not find public key with kid ${kid}`);
  }
  return key.publicKey;
}

async function verify_access_token(token) {
  const decoded = jwt.decode(token, { complete: true });
  const kid = decoded.header.kid;
  const publicKey = await get_public_key(kid);
  const algorithm = decoded.header.alg;
  const options = { algorithms: [algorithm] };
  jwt.verify(token, publicKey, options);
}

async function get_halo_infinite_headers() {
  const claims = {
    iss: 'your-issuer',
    aud: 'https://userpresence.svc.halo.gg/prod/realtime/v1/user-presence',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 300,
    sub: 'your-subject',
  };
  const token = generate_access_token(claims);
  await verify_access_token(token);
  const headers = {
    Authorization: `Bearer ${token}`,
    'User-Agent': useragent,
  };
  return headers;
}

module.exports = {
  generate_access_token,
  get_public_key,
  verify_access_token,
  get_halo_infinite_headers,
};
