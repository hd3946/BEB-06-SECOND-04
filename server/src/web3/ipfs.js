import { create as ipfsHttpClient } from 'ipfs-http-client';// ipfs-core 

const ipfs = ipfsHttpClient('/ip4/127.0.0.1/tcp/5001'); // core 없다

const imgUpload = async (img) => { 
  if(!Buffer.isBuffer(img)) return null;  //  fs라이브 read(../imges/hi.jpg)
  const addFile = await ipfs.add(img);
  const initUri = "https://ipfs.io/ipfs/";
  const mkUrl = initUri + addFile.cid;
  return mkUrl;
}

const jsonUpload = async (json) => { 
  if(!json) return null;
  const addFile = await ipfs.add(json);
  const initUri = "https://ipfs.io/ipfs/";
  const mkUrl = initUri + addFile.cid;
  return mkUrl;
}


export { imgUpload, jsonUpload }; 

