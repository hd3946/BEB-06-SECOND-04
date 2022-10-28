var express = require('express');
var { User } = require('../../models/index');
var router = express.Router();

/* users router listing. */
router.post('/signup', function(req, res, next) {
  res.send('here is users router');
});

router.post('/login', async (req, res, next) => {
  try {
    const userId = req.body.email;
    const password = req.body.password;
  
    const data = await User.findOne({  
      where: { email: userId, password: password  },
    });
  
    const dataValues = data.dataValues;
    if (!dataValues.deletedAt) { //탈퇴되었는지 확인
      delete dataValues.password //비밀번호 삭제
      delete dataValues.deletedAt
      res.cookie("loginData", data.dataValues, { maxAge: 3*60*60*1000, httpOnly: true }); //3시간유효
      console.log('로그인 성공');
      return res.status(200).send('login ok');
    } else {
      console.log('로그인 실패');
      return res.status(200).send('탈퇴된 아이디입니다.')
    };
  } catch (err) { 
    next(err);
  }
});

router.post('/logout', (req, res, next) => {
  res.cookie("loginData", null, { maxAge: 0, httpOnly: true }); //쿠키삭제
  console.log('로그아웃되었습니다');
  return res.send('logout ok');
});



//회원정보 수정
// router.post('/', function(req, res, next) {
//   res.send('here is users router');
// });

module.exports = router;
