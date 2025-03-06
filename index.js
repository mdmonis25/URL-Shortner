const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const app = express();
const PORT = 8001;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Connected")
);
app.use("/url", urlRoute);
app.get("/test", (req, res) => {
  res.end("<h1>Md Monis sssss</h1>");
});
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});
app.listen(PORT, () => console.log(`Server started at port ${PORT}.`));
