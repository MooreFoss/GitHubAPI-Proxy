const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// 使用CORS中间件
app.use(cors());

const fetchGitHubData = async (req, res) => {
    const apiUrl = `https://api.github.com${req.originalUrl.replace('/github', '') || '/'}`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'User-Agent': 'Request-Promise',
                // 可选：使用 GitHub 令牌
                //'Authorization': `token your_github_token`,
            },
        });

        let responseData = JSON.stringify(response.data);
        const apiHostPattern = /https?:\/\/api.github.com/g;
        responseData = responseData.replace(apiHostPattern, currentHost);

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from GitHub:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// 合并路径处理
app.use('/github/*', fetchGitHubData);
app.use('/github', fetchGitHubData);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
