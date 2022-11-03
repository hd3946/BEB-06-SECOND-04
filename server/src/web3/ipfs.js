import * as IPFS from "ipfs-core";
import fs from 'fs';   

const node = await IPFS.create();
//fileName filePath
const ipfsUpload = async (url) => { 
  //const image = fs.readFileSync("./Image/metamask.png"); 
  const addFile = await node.add(url);
  const initUri = "https://ipfs.io/ipfs/";
  const mkUrl = initUri + addFile.cid;
  //console.log(mkUrl);
  return mkUrl;
}
export default ipfsUpload; 

