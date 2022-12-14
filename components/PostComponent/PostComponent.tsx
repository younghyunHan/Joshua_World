import { useEffect, useState, useRef, useCallback } from "react";
import { Editor } from "@toast-ui/react-editor";

import axios from "axios";
import { customAxios } from "../../lib/CustomAxios";

import PostComponentStyles from "./PostComponent.module.css";

// TOAST UI Editor CSS
import "@toast-ui/editor/dist/toastui-editor.css";

// color-syntax CSS
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

// code syntax highlight
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs"; // prism 테마 추가
import "prismjs/components/prism-clojure.js";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

// table-merged-cell
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";

const PostComponent = () => {
  const postTitleRef = useRef<HTMLInputElement>(null);
  const postThumnailLinkRef = useRef<HTMLInputElement>(null);
  const postThumbnailRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);

  const editorInstance = editorRef?.current?.getInstance();

  const countRef = useRef(0);

  const checkuseRef = (event: { preventDefault: any }) => {
    event?.preventDefault();
    countRef.current = countRef.current + 1;
    // console.log(`ref 증가 --> ${countRef.current}`);
    // console.log(countRef);
    // console.log(editorInstance);
  };

  const access_token = localStorage.getItem("token");

  const postUploadButtonClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (!postThumbnailRef.current) {
        return;
      }

      const savedPostTitle = postTitleRef?.current?.value as string;
      const savedThumbnailLink = postThumnailLinkRef?.current?.value as string;
      const savedThumbnailImgs = postThumbnailRef.current.files as FileList;

      const formData = new FormData();

      const postMainHtml = editorInstance?.getHTML();

      // console.log(savedPostTitle);
      // console.log(savedThumbnailImgs[0]);
      // console.log(savedThumbnailLink);
      console.log(postMainHtml);
      // console.log(`ref 증가 --> ${countRef.current}`);

      formData.append("postTitle", savedPostTitle);
      formData.append("postThumbnailLink", savedThumbnailLink);
      formData.append("postThumnailImg", savedThumbnailImgs[0]);
      formData.append("postMainHtml", postMainHtml);

      // axios
      //   .post("http://localhost:3000/userInfoUpdate", formData, {
      //     headers: {
      //       // Authorization: `${access_token}`,
      //       "Content-Type": "multipart/form-data",
      //     },
      //   })
      //   .then(function (response) {
      //     if (response.data.message === "SUCCESS") {
      //       alert("게시글 저장되었습니다.");
      //     }
      //   });

      // customAxios.post("/userInfoUpdate", formData); // customAxios
    },
    [postTitleRef, postThumnailLinkRef, postThumbnailRef]
  );

  return (
    <section id={PostComponentStyles.post}>
      <h1 id={PostComponentStyles.postPageTitle}>ADD POST</h1>
      <form id={PostComponentStyles.postPageForm}>
        <h2 id={PostComponentStyles.postTitle}>Title</h2>
        <input
          id={PostComponentStyles.postTitleInput}
          type="text"
          name="postTitle"
          placeholder="제목을 입력해주세요."
          ref={postTitleRef}
        />
        <h2 id={PostComponentStyles.postThumbnail}>Thumbnail</h2>
        <div id={PostComponentStyles.postThumnailWrap}>
          <input
            id={PostComponentStyles.postThumnailLink}
            type="text"
            name="postThumbnailLink"
            placeholder="링크를 입력해주세요."
            ref={postThumnailLinkRef}
          />
          <span>or</span>
          <input
            id={PostComponentStyles.postThumnailInput}
            type="file"
            accept="image/*"
            ref={postThumbnailRef}
          />
        </div>
        <Editor
          ref={editorRef}
          initialValue="hello react editor world!"
          previewStyle="vertical"
          height="500px"
          usageStatistics={false}
          plugins={[
            colorSyntax,
            tableMergedCell,
            [codeSyntaxHighlight, { highlighter: Prism }],
          ]}
        />
        <button
          id={PostComponentStyles.postUploadBtn}
          onClick={postUploadButtonClick}
        >
          게시글 작성
        </button>
        <button onClick={checkuseRef}>useRef값 확인</button>
      </form>
    </section>
  );
};

export default PostComponent;
