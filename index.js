const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

// gender: str
//     hypertension: bool
//     heart_disease: bool
//     age: int
//     bmi: float
//     hba1c_level: float
//     blood_glucose_level: int

app.post("/", async (req, res) => {
  const {
    gender,
    hypertension,
    heart_disease,
    age,
    bmi,
    hba1c_level,
    blood_glucose_level,
  } = req.body;

  if (
    !gender ||
    !hypertension ||
    !heart_disease ||
    !age ||
    !bmi ||
    !hba1c_level ||
    !blood_glucose_level
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { data } = await axios.post(
      "https://back-end-1-cvsl.onrender.com/predict",
      {
        ...req.body,
      }
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
