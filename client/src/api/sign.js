// 로그인, 회원 가입, (ex) 회원 탈퇴
import { sign } from './index';

// 회원가입 API
function registerUser(userData) {
  return sign.post('signup', userData);
}

// 로그인 API
function loginUser(userData) {
  return sign.post('signin', userData);
}

// 로그아웃 API
function logoutUser() {
  return sign.post('signout');
}

export { registerUser, loginUser, logoutUser };
