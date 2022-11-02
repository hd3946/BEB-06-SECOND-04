import axios from "axios";
import { setInterceptors } from "./common/interceptors";

// 액시오스 초기화 함수
function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `http://localhost:3005/${url}`,
  });
  console.log(instance.interceptors);
  return setInterceptors(instance);
}

export const instance = createInstanceWithAuth(); //http://localhost:3005/
export const sign = createInstanceWithAuth("users"); // http://localhost:3005/users
export const comment = createInstanceWithAuth("comment"); // http://localhost:3005/comment
export const post = createInstanceWithAuth("post");
