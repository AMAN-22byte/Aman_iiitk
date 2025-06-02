const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, inputPath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`);

  return new Promise((resolve, reject) => {
    // Use double quotes to handle spaces in path
    const compileCommand = `g++ "${filepath}" -o "${outPath}"`;
    const runCommand = `"${outPath}" < "${inputPath}"`;

    exec(`${compileCommand} && ${runCommand}`, (error, stdout, stderr) => {
      if (error) return reject({ error, stderr });
      if (stderr) return reject(stderr);
      resolve(stdout);
    });
  });
};

module.exports = {
  executeCpp,
};

// docker run -p 8000:8000 cpp-compiler  (localhost:dockerhost)
