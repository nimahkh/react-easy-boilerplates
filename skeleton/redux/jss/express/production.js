const express = require('express');
const path = require('path');
const app = express();
const ClientStatsPath = path.join(__dirname, './../dist/stats.json');
const ServerRendererPath = path.join(__dirname, './../dist/server.js');
const ServerRenderer = require(ServerRendererPath).default;
const Stats = require(ClientStatsPath);

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(ServerRenderer(Stats));

const PORT = process.env.PORT || 3050;

app.listen(PORT, error => {
    if (error) {

        return console.error(error);

    } else {

        console.log(`Production Express server running at http://localhost:${PORT}`);
    }
});
