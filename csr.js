const express = require('express');
const cors = require('cors');
const axios = require('axios');
const tokens = require('./tokens.js');

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/csr/:gamertag', async (req, res) => {
  try {
    const gamertag = req.params.gamertag;
    const headers = await tokens.get_halo_infinite_headers();
    const response = await axios.get(`https://www.halowaypoint.com/proxy/commerce/h5credits/${gamertag}`, { headers });
    const csr = response.data.CampaignCsr;
    const rank = csr.MatchMakingResult.Results[0].Rank.MatchMakingRank.Rank;
    res.send(`Your current CSR rank is ${rank}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Backend API listening at http://localhost:${port}`);
});
