
const isLoggedIn = (req, res, next) => {
  if (!req.cookies.loginData){
    return res.status(401).json({
      status: false,
      message: "로그인이 필요합니다.",
    });
  } else{
    next();
  }
  
}

export { isLoggedIn }

// exports.isLoggedIn = (req, res, next) => {
  
//   req.decoded = jwt.verify(req.cookies.token, )
//   if (req.isAuthenticated()) {
//     console.log('로그인됨', req.isAuthenticated()); 
//     next();
//   } else {
//     console.log('로그인안됨', req.isAuthenticated());  //, req.session.passport.user
//     res.status(403).json({
//       message: '로그인 필요합니다~!',
//     });
//   }
// };

// exports.isNotLoggedIn = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     next();
//   } else {
//     const message = '로그인한 상태입니다.';
//     res.json(`error=${message}`);
//   }
// };

