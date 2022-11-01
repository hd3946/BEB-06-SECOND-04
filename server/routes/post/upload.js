import multer from 'multer';
import path from 'path';
//var fs = require('fs');  
import dotenv from 'dotenv';
dotenv.config();
 
//multer 이용하여 이미지 업로드
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  //limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
// try {
//   fs.readdirSync('uploads');
// } catch (error) {
//   console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
//   fs.mkdirSync('uploads');
// }
// github : https://github.com/patrickjuchli/basic-ftp
// FTP를 이용한 데이터 업로드 기능
// async function FTPUpload(file, userid) {
//   const client = new ftp.Client()
//   client.ftp.verbose = true
//   try {
//       await client.access({
//           host: env.MYSQL_HOST,
//           user: env.DATABASE_FTP_ID,
//           password: env.MYSQL_PASSWORD,
//           secure: true
//       })
      
//       await client.ensureDir("nobrake/image");
//       //await client.clearWorkingDir(); // 모든데이터삭제
//       //await client.uploadFromDir("nobrake/image");

//       const writeStream = streamifier.createReadStream(file.buffer);
//       const ext = path.extname(file.originalname);
//       await client.uploadFrom(writeStream, userid + Date.now() + ext)
//           .then((result) => {
//             console.log("Upload success");
//           })
//           .catch((e) => {
//             console.error(e);
//           });
//       client.close();
     
//   }
//   catch(err) {
//       console.log(err)
//   }
//   client.close()
// }
