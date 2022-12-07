import axios, { AxiosInstance } from "axios";

const access_token = localStorage.getItem("token");

// axios 인스턴스를 생성합니다.
export const customAxios: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000", // 기본 서버 주소 입력
  headers: {
    Authorization: `${access_token}`,
    "Content-Type": "multipart/form-data",
  },
});

/*
    1. 요청 인터셉터
    2개의 콜백 함수를 받습니다.
*/
customAxios.interceptors.request.use(
  (config) => {
    // 요청 성공 직전 호출됩니다.
    // axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)
    return config;
  },
  (err) => {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(err);
  }
);

/*
    2. 응답 인터셉터
    2개의 콜백 함수를 받습니다.
*/
customAxios.interceptors.response.use(
  (config) => {
    /*
        http status가 200인 경우
        응답 성공 직전 호출됩니다. 
        .then() 으로 이어집니다.
    */
    return config;
  },
  (err) => {
    /*
        http status가 200이 아닌 경우
        응답 에러 직전 호출됩니다.
        .catch() 으로 이어집니다.    
    */
    return Promise.reject(err);
  }
);
