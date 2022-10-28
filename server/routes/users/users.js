var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

/* users router listing. */
router.post('/login', function(req, res, next) {
  res.send('here is users router');
});

router.post('/logout', function(req, res, next) {
  res.send('here is users router');
});

router.post('/signup', function(req, res, next) {
  console.log('회원가입 API signup 실행');

  const { email, password, nick } = req.body;
  console.log('데이터 체크', email, password, nick);

  if(email === '') return res.status(401).json('email 에러');
  if(password === '') return res.status(401).json('password 에러');
  if(nick === '') return res.status(401).json('닉네임 에러');

  try{
    const exUser = await User.findOne({ where: { email } });
    if (exUser) return res.status(401).json('Authentication failed. 사용자 이미 존재합니다.');
    const hash = await bcrypt.hash(password, 12);
    
    await User.create({
      email,
      nick,
      password: hash,
    });

    res.status(200).json({
      success: true,
      message: `user: ${nick} is Signup Success`,
      //token: token,
    });
  }catch(error) {
    res.send('here is error', error);
  }
 
});

//회원정보 수정
// router.post('/', function(req, res, next) {
//   res.send('here is users router');
// });

module.exports = router;
