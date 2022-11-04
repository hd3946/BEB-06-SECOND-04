import { create as ipfsHttpClient } from 'ipfs-http-client';

const ipfs = ipfsHttpClient('/ip4/127.0.0.1/tcp/5001');

const ipfsUpload = async (url) => { 
  const addFile = await ipfs.add(url);
  const initUri = "https://ipfs.io/ipfs/";
  const mkUrl = initUri + addFile.cid;
  return mkUrl;
}

export default ipfsUpload; 

