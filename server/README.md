## Getting Start Server
<br />


## Require 
-----
> IPFS Desktop [Install](https://ipfs.tech/#install) <br />
> Ganache [Intall](https://trufflesuite.com/ganache) <br />
> truffle [`npm install -g truffle`](https://www.npmjs.com/package/truffle) <br />
> Mysql CLI or Workbench [Install](https://dev.mysql.com/downloads/) <br />
> OPTION: Metamask [Install](https://metamask.io/) <br />


<br />

## Step <br />
-----
#### 1. `npm install` <br />
#### 2. Ganache 실행 (Default. PORT: 7545, NetworkID 5777)
#### 3. IPFS Desktop 실행 (AllowOrigin: "http:localhost:3005", Methods: "GET", "POST")
#### 4. `cd truffle` (Go to truffle file)
#### 5. `truffle migration`&nbsp;&nbsp;(deploy Contract)<br />
#### 6. `cd ..`(Go back to server file)
#### 7. clone .env.example and rename .env
#### 8. input .env arguments
#### 9. Create Mysql DB &nbsp;&nbsp;[`CREATE DATABASE INPUT_YOUR_DATABASE;`](https://www.w3schools.com/mysql/mysql_create_db.asp)
#### 9. `npm start`

<br />
<br />

-----
<br />

### 메타마스크 Remix로 contract deploy 방법
#### 1. Ganache 실행
#### 2. 메타마스크 Ganache 네트워크 추가 &nbsp;&nbsp; (RPC - http://127.0.0.1:7545 &nbsp; chainID - 1337) <br />
#### 3. 메타마스크에 Ganache account 가져오기 
#### 4.  remix로 contract를 불러와서 Ganache 네트워크에 Deploy &nbsp; (compile version v0.8.10)

<br />
<br />

### IPFS Desktop CORS setting
<p align="center">
  <img src='../.github/ipfs_setting.png' width = 800 alt = 'IPFS_Setting_png'/>
</p>


<br />
<br />

-----
> ## version 
-----
<pre>
web3 v1.8.0
Ganache v2.5.4
Truffle v5.5.31 (core: 5.5.31)
@openzeppelin/contracts v4.7.3
ipfs-http-client v57.0.0
mysql v8.0.31
sequelize v6.25.3
sequelize-cli v6.5.2
axios v1.1.3
</pre>
