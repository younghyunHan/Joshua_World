import React, { useState, useEffect } from "react";

export default function Detail() {
  const [like, setLike] = useState(0);

  <>
    <div>상세페이지</div>
    <span
      onClick={() => {
        setLike(like + 1);
      }}
    >
      Likes{like}
    </span>
  </>;
}
