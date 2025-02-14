const express = require("express");
const app = express();
const PORT = 8001;

app.use("/url",urlRoute);
app.listen(PORT, () => console.log(`Server started at port ${PORT}.`));
