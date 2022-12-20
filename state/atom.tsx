import { atom } from "recoil";

type postData = {
  [key: string]: any;
  default?: object;
};

let postData = atom({
  key: "postData",
  default: {},
});

export default postData;
