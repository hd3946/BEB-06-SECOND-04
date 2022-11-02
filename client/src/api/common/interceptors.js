export function setInterceptors(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      config.headers["Content-Type"] = "application/json; charset=utf-8";
      config.withCredentials = true;
      //config.headers.Authorization = store.state.token; // token
      console.log(config);
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // 응답에 대한 리턴값 설정 및 오류 발생에 대한 처리
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return instance;
}
