import * as IPFS from "ipfs-core";
import fs from 'fs';   

const node = await IPFS.create();
//fileName filePath
const addFile = async () => {
  let test = "test";
  const image = fs.readFileSync("./Image/metamask.png"); 
  const fileAdded = await node.add(image);
  const initailUri = "https://ipfs.io/ipfs/";
  test = initailUri + fileAdded.cid;
  console.log(test);
  return test;
}
export default addFile;
// exports.startNode = async () => {
//   console.log("Starting IPFS node...");
//   return await IPFS.create();
// };

// exports.getTokenUri = async (uri) => {
//   let test = "test";
//   const image = fs.readFileSync("./Image/metamask.png");
//   // const image = fs.readFileSync(uri);
//   const fileAdded = node.add(image);
//   const initailUri = "https://ipfs.io/ipfs/";
//   test = initailUri + fileAdded.cid;
//   return test;
// };
