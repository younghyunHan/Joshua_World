import axios, { AxiosInstance } from "axios";

const access_token = localStorage.getItem("token");

export const customAxios: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000", // 기본 서버 주소 입력
  headers: {
    Authorization: `${access_token}`,
    "Content-Type": "multipart/form-data",
  },
});
