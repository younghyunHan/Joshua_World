import React, { useRef, useCallback, useState } from "react";
import dynamic from "next/dynamic";

// components
import Nav from "../../components/Nav/Nav";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";

// CSS
import PostStyles from "./post.module.css";

export default function Post() {
  const Editor = dynamic(
    () => import("../../components/PostComponent/PostComponent"),
    {
      ssr: false,
    }
  );

  return (
    <>
      <HeaderTitle />
      <Nav />
      <Editor />
    </>
  );
}
