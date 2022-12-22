import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { countLike } from "../../lib/CustomAxios";

import PostViewStyles from "./postView.module.css";

export default function PostView() {
  const [like, setLike] = useState(0);
  const countRef = useRef(0);

  const countLike = () => {
    countRef.current = countRef.current + 1;
  };

  useEffect(() => {
    axios.get;
  }, []);

  return (
    <>
      <div id={PostViewStyles.postViewTitle}>상세페이지</div>
      <span onClick={countLike}>Likes{like}</span>
      {/* savedLike -> countLike -> post API -> saveLike */}
    </>
  );
}
