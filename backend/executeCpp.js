const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputDir = path.join(__dirname, "output");
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const executeCpp = (filePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const output_filename = `${jobId}.exe`;
    const outPath = path.join(outputDir, output_filename);

    return new Promise((resolve, reject) => {
        exec(`g++ ${filePath} -o ${outPath} && ${outPath}`, (error, stdout, stderr) => {
            if (error) {
                return reject({ error, stderr });
            }
            resolve(stdout);
        });
    });
};

module.exports = {
    executeCpp
};
