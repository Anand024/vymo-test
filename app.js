const express = require('express');
const app = express();
const routeHandle = require('./routes/routeHandler');

app.use(express.json());

app.use("/api/v1/leadboard", routeHandle);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});