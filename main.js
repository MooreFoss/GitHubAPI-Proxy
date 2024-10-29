const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const fetchGitHubData = async (req, res) => {
    const apiUrl = `https://api.github.com${req.originalUrl}`;
    const currentHost = `${req.protocol}://${req.get('host')}`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'User-Agent': 'Request-Promise',
            },
        });

        let responseData = JSON.stringify(response.data);
        const apiHostPattern = /https?:\/\/api.github.com/g;
        responseData = responseData.replace(apiHostPattern, currentHost);

        res.json(JSON.parse(responseData));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

app.use('/', fetchGitHubData);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
