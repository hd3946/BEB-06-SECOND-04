import { sign } from "./index";

function registerInfo() {
  return sign.get("info");
}

function registerUser(userData) {
  return sign.post("signup", userData);
}

function loginUser(userData) {
  return sign.post("signin", userData);
}

function logoutUser() {
  return sign.post("signout");
}

export { registerInfo, registerUser, loginUser, logoutUser };
