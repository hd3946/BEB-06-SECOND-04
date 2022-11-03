import { sign } from "./index";

function registerInfo() {
  return sign.post("info");
}

function registerUser(userData) {
  return sign.post("signup", userData);
}

function loginUser(userData) {
  return sign.post("signin", userData);
}

function updateProfileUser(imgData) {
  return sign.post("signintes", imgData);
}

function logoutUser() {
  return sign.post("signout");
}

export { registerInfo, registerUser, loginUser, updateProfileUser, logoutUser };
