const express = require('express');
const app = express();
const {generateFile} = require("./generateFile");
const {executeCpp} = require('./executeCpp')
const cors = require('cors');
const port = 3000
app.use(cors());
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// code and lang
app.post("/run", async (req, res) => {
    const { lang = 'cpp', code } = req.body;

    if (!code) {
        return res.status(400).json({ message: "Code is required" });
    }

    try {
        const filePath = generateFile(lang, code);
        const output = await executeCpp(filePath); 

        return res.json({ output }); 
    } catch (error) {
        console.error("Execution Error:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.stderr || "Unknown execution error"
        });
    }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;