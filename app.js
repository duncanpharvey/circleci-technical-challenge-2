const express = require("express");
const app = express();

app.get("/", function(req, res) {
    res.send('Hello World!')
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`)); // use port if provided, otherwise use 5000