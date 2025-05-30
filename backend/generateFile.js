const fs=require('fs');
const path=require('path');
const {v4:uuid} = require('uuid');

const dir = path.join(__dirname,"codes");// backend dir +codes
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir,{recursive:true});
}
// console.log(uuid())
const generateFile = (lang,codes)=>{
    // console.log(dir);
    const jobId = uuid();
    const filename =`${jobId}.${lang}`;
    // console.log(filePath);
    const filePath = path.join(dir,filename);
    fs.writeFileSync(filePath,codes);
    return filePath;
};

module.exports={
    generateFile
}