import React, { useRef, useCallback } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

// components
import Nav from '../../components/Nav/Nav';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';

// CSS
import PostStyles from './post.module.css';

export default function Post() {
  // const access_token = localStorage.getItem('token');

  const Editor = dynamic(() => import('../../components/Editor/Editor'), {
    ssr: false,
  });

  const postTitleRef = useRef<HTMLInputElement>(null);
  const postThumnailLinkRef = useRef<HTMLInputElement>(null);
  const postThumbnailRef = useRef<HTMLInputElement>(null);

  const savedTitle = postTitleRef?.current?.value;

  console.log(savedTitle);
  // console.log(postTitleRef?.current?.value);
  // console.log(postThumnailLinkRef?.current?.value);
  // console.log(postThumbnailRef?.current?.files);

  const postUploadButtonClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (!postThumbnailRef.current) {
        return;
      }

      // console.log(postTitleRef?.current?.value);
      // console.log(postThumnailLinkRef?.current?.value);
      // console.log(postThumbnailRef?.current?.files);

      const savedTitle = postTitleRef?.current?.value as string;
      const savedThumbnailLink = postThumnailLinkRef?.current?.value as string;
      const savedImgs = postThumbnailRef.current.files as FileList;

      const formData = new FormData();

      formData.append('postThumnailImg', savedImgs[0]);
      formData.append('postTitle', savedTitle);
      formData.append('postThumbnailLink', savedThumbnailLink);

      axios
        .post('http://localhost:3000/userInfoUpdate', formData, {
          headers: {
            // Authorization: `${access_token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(function (response) {
          if (response.data.message === 'SUCCESS') {
            alert('게시글 저장되었습니다.');
          }
        });
    },
    [postTitleRef, postThumnailLinkRef, postThumbnailRef],
  );

  return (
    <>
      <HeaderTitle />
      <Nav />
      <section id={PostStyles.post}>
        <h1 id={PostStyles.postPageTitle}>ADD POST</h1>
        <form id={PostStyles.postPageForm}>
          <h2 id={PostStyles.postTitle}>Title</h2>
          <input
            id={PostStyles.postTitleInput}
            type="text"
            name="postTitle"
            placeholder="제목을 입력해주세요."
            ref={postTitleRef}
          />
          <h2 id={PostStyles.postThumbnail}>Thumbnail</h2>
          <div id={PostStyles.postThumnailWrap}>
            <input
              id={PostStyles.postThumnailLink}
              type="text"
              name="postThumbnailLink"
              placeholder="링크를 입력해주세요."
              ref={postThumnailLinkRef}
            />
            <span>or</span>
            <input
              id={PostStyles.postThumnailInput}
              type="file"
              accept="image/*"
              ref={postThumbnailRef}
            />
          </div>
          <Editor />
          <button id={PostStyles.postUploadBtn} onClick={postUploadButtonClick}>
            개인 정보 수정
          </button>
        </form>
      </section>
    </>
  );
}
