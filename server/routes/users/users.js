var express = require('express');
var { User } = require('../../models/index');
var router = express.Router();
var bcrypt = require('bcrypt');

// var { isLoggedIn } = require('./middlewares'); 

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
    const hash = await bcrypt.hash(password, 10);
    
    await User.create({
      email,
      nick,
      password: password,
    });

    res.status(200).json({
      status: true,
      message: `user: ${nick} is Signup Success`,
      //token: token,  보류
    });
  }catch(error) {
    res.send('here is error', error);
  }
 
});



//회원정보 수정
// router.post('/', function(req, res, next) {
//   res.send('here is users router');
// });

// 유저 프로필이미지 넣기
router.post('/img',  upload.single('avatar'), isLoggedIn ,async (req, res) => {
  try{
    console.log('프로필 이미지 업로드', req.file.location, req.user.id);
    const profileurl = req.file.location;

    const result = await User.update({
      profileurl,
    }, {
      where: {
        id: req.user.id,
      }
    }); 
    console.log('결과', result);

    if(result){
      return res.status(200).json({
        status: true,
        message: 'My-profile',
      }); 
    }else{
      return res.status(200).json({
        status: false,
      });
    }
    
  }catch (error){
    console.error(error);
  } 
});

//유저 정보 조회
router.get('/', isLoggedIn ,async (req, res) => {
  console.log('유저 POST 조회 API', req.user.id);
  try{
    const UserPost = await Post.findAll({ where: { UserId: req.user.id } });
    //console.log(UserPost);
    return res.status(200).json({
      user: UserPost,
      message: '유저 정보 조회',
    });
  }catch(error) {
    console.error(error);
    next(error);
  } 
});


module.exports = router;
