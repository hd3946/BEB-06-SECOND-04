var express = require('express');
var router = express.Router();

const tokenAddr = process.env.TOKEN_CONTRACT_ADDRESS
const serverAddr = process.env.SERVER_ADDRESS;        //가나슈1
const userAddr = process.env.USER_ADDRESS;          //가나슈2

const Contract = require('web3-eth-contract');
Contract.setProvider('http://localhost:7545');
const tokenABI = require('../../web3/tokenABI'); 
const tokenContract = new Contract(tokenABI, tokenAddr);

var { User, Post } = require('../../models/index');
var { upload } = require('./upload')  
// const { isLoggedIn } = require('./middlewares'); 

/* post router listing. */
//사진 한장~! , 
router.post('/', upload.single('post'), async (req, res, next) => {
  if(!req.cookies.loginData) return res.status(401).json('로그인되어 있지 않습니다.')
  try {
    const userId = req.cookies.loginData.id;
    const { title, content } = req.body;
    console.log('유저 포스트 업로드', userId);  
    const post = await Post.create({
      title: title,
      content: content,
      // img: req.file.location, 
      userId: userId,
    });
    //해쉬태그 
    // const hashtags = req.body.content.match(/#[^\s#]*/g);
    // if (hashtags) {
    //   const result = await Promise.all(
    //     hashtags.map(tag => {
    //       return Hashtag.findOrCreate({
    //         where: { title: tag.slice(1).toLowerCase() },
    //       })
    //     }),
    //   );
    //   await post.addHashtags(result.map(r => r[0]));
    // }
    if (post) { //게시글 하나 작성할때마다 토큰을 하나 전송
      const transferToken = await tokenContract.methods.transfer(userAddr, 1).send({ from: serverAddr }) //user에게 token를 전송
      const tokenBalance = await tokenContract.methods.balanceOf(userAddr).call()
      return res.status(200).json({
        status: true,
        tokenBalance: tokenBalance,
        message: 'Post Success',
      }); 
    } else {
      const tokenBalance = await tokenContract.methods.balanceOf(userAddr).call()
      return res.status(200).json({
        status: false,
        tokenBalance: tokenBalance,
        message: 'Post fail',
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
