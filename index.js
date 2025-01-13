const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://back-end-1-cvsl.onrender.com/predict"
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/health-check", (req, res) => {
  res.json({ status: "UP" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
