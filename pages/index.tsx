import Link from "next/link";
import React, { useState, useEffect } from "react";
// import Link from 'next/link';
import { getMainData } from "../lib/CustomAxios";

import Nav from "../components/Nav/Nav";
import HeaderTitle from "../components/HeaderTitle/HeaderTitle";
// import Modal from './Modal/Modal';
// import TopListData from './TopListData/TopListData';
// import MainContent from './MainContent/MainContent';

import MainStyles from "./Main.module.css";

function Main() {
  // const [categoryVisible, setCategoryVisible] = useState(true);
  // const [navList, setNavList] = useState([]);
  // const [userName, setUserName] = useState('');

  // type setMainDataType = {
  //   postTitle: string;
  //   postThumbnailLink: string;
  //   postMainHtml: string;
  // };

  type mainDataType = [
    postTitle: string,
    postThumbnailLink: string,
    postThumbnailImg: File,
    postMainHtml: string
  ];

  const [mainData, setMainData] = useState<mainDataType[] | []>([]);

  // const [listData, setListData] = useState([]);
  // const [selectCategoryData, setSelectCategoryData] = useState('');
  // const [searchData, setSearchData] = useState('');
  // const [modalOpen, setModalOpen] = useState(false);

  // interface userInfoDataType {
  //   user_name: string;
  //   user_img: string;
  // }

  // // user_info 변경
  // const [userInfoData, setUserInfoData] = useState<null | userInfoDataType>(
  //   null,
  // );

  useEffect(() => {
    getMainData.get("/").then(function (response) {
      setMainData(response.data);
    });
  }, []);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const access_token = localStorage.getItem('token');

  //     axios
  //       .get('http://localhost:3000/list', {
  //         headers: {
  //           Authorization: `${access_token}`,
  //         },
  //       })
  //       .then(function (response) {
  //         setListData(response.data);
  //       });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const access_token = localStorage.getItem('token');

  //     axios
  //       .get('http://localhost:3000/selectCategory', {
  //         headers: {
  //           Authorization: `${access_token}`,
  //         },
  //         params: {
  //           category: selectCategoryData,
  //         },
  //       })
  //       .then((response: any) => {
  //         setListData(response.data);
  //       });
  //   }
  // }, [selectCategoryData]);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const access_token = localStorage.getItem('token');

  //     axios
  //       .get('http://localhost:3000/searchData', {
  //         headers: {
  //           Authorization: `${access_token}`,
  //         },
  //         params: {
  //           searchData: searchData,
  //         },
  //       })
  //       .then((response: any) => {
  //         setListData(response.data);
  //       });
  //   }
  // }, [searchData]);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3000/category', {
  //       headers: {
  //         Authorization: `${access_token}`,
  //       },
  //     })
  //     .then(function (response) {
  //       setNavList(response.data);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3000/userName', {
  //       headers: {
  //         Authorization: `${access_token}`,
  //       },
  //     })
  //     .then(function (response) {
  //       setUserName(response.data[0].user_name);
  //     });
  // }, []);

  // const selectCategory = (event: any) => {
  //   setSelectCategoryData(event.target.textContent);
  // };

  // const searchUsersInput = (event: any) => {
  //   const userInput = event.target.value;
  //   setSearchData(userInput);
  // };

  // const showEditModal = () => {
  //   setModalOpen(!modalOpen);
  // };

  // const handleUserData = (updatedUserName: string, updatedUserImg: string) => {
  //   setUserInfoData({
  //     user_name: updatedUserName,
  //     user_img: updatedUserImg,
  //   });
  // };

  // const userImg = userInfoData?.user_img;

  return (
    <>
      <header>
        <HeaderTitle />
        <Nav />
      </header>
      <main id={MainStyles.main}>
        <section id={MainStyles.informationTech}>
          <div id={MainStyles.mainTitleBox}>
            <h2 id={MainStyles.mainTitle}>HOME</h2>
            <div id={MainStyles.indicators}>
              <span id={MainStyles.numberOfPosts}>+6 posts</span>
              <span id={MainStyles.numberOfHashTags}>+13 hashtags</span>
            </div>
          </div>
          <div id={MainStyles.mainSubTitleBox}>
            <span id={MainStyles.mainSubTitleLeftLine} />
            <strong id={MainStyles.mainSubTitle}>Information Technology</strong>
            <span id={MainStyles.mainSubTitleRightLine} />
          </div>
          <article id={MainStyles.mainPosts}>
            {/* map */}
            <img
              className={MainStyles.mainPostsImg}
              // src="https://dersyb7nfifdf.cloudfront.net/blog/2021/08/frontend-backend-Copy.png"
              src={mainData?.postThumbnailLink}
              alt="mainDataImg"
            />

            <div className={MainStyles.mainContentBox}>
              <h3 className={MainStyles.mainContentTitle}>
                {mainData?.postTitle}
              </h3>
              <div className={MainStyles.mainContentHashTag}>
                #성능 최적화 &nbsp;&nbsp;#리팩토링 &nbsp;&nbsp;#dry &nbsp;&nbsp;
                #kiss
              </div>
              <div className={MainStyles.mainContent}>
                {/* 구현이 전부가 아니다. 썸네일 출처 :
                https://www.ironhack.com/en/web-development/front-end-vs-back-end-what-s-the-difference
                프로젝트. 자바스크립트는 어떻게 돌아갈까? 브라우저 자바스크립트
                엔진까지 알아보았습니다. 그렇다면 프론트엔드에서 자바스크립트는
                어떻게... */}
                {mainData?.postMainHtml}
              </div>
              <div className={MainStyles.mainContentBottom}>
                <span className={MainStyles.mainContentTime}>9 days ago</span>
                <div className={MainStyles.verticalBar} />
                <span className={MainStyles.mainContentViews}>14 views</span>
                <div className={MainStyles.verticalBar} />
                <span className={MainStyles.mainContentLikes}>0 Likes</span>
              </div>
            </div>
          </article>
        </section>
        <aside id={MainStyles.mainAside}>
          <article className={MainStyles.asidePostBox}>
            <div className={MainStyles.asidePostBoxTop}>
              <img
                id={MainStyles.likeImg}
                src="/images/likes.png"
                alt="like Img"
              />
              <h4>IN TECH 0 Likes</h4>
            </div>
            <h5 className={MainStyles.asidePostBoxTitle}>
              4. 자바스크립트 특징과 역사 | 웹 모르는 개발자
            </h5>
            <div className={MainStyles.asidePostBoxBottom}>
              <span className={MainStyles.aisdePostTime}>9 days ago</span>
              <div className={MainStyles.verticalBar} />
              <span className={MainStyles.asidePostViews}>14 views</span>
              <div className={MainStyles.verticalBar} />
              <span className={MainStyles.aisdePostLikes}>0 Likes</span>
            </div>
          </article>
          <article className={MainStyles.asidePostBox}>
            <div className={MainStyles.asidePostBoxTop}>
              <img
                id={MainStyles.viewsImg}
                src="/images/views.png"
                alt="viewsImg"
              />
              <h4>IN TECH 18 Views</h4>
            </div>
            <h5 className={MainStyles.asidePostBoxTitle}>
              4. 자바스크립트 특징과 역사 | 웹 모르는 개발자
            </h5>
            <div className={MainStyles.asidePostBoxBottom}>
              <span className={MainStyles.aisdePostTime}>9 days ago</span>
              <div className={MainStyles.verticalBar} />
              <span className={MainStyles.asidePostViews}>14 views</span>
              <div className={MainStyles.verticalBar} />
              <span className={MainStyles.aisdePostLikes}>0 Likes</span>
            </div>
          </article>
          <article className={MainStyles.asidePostBox}>
            <div className={MainStyles.asidePostBoxTop}>
              <img
                id={MainStyles.commentImg}
                src="/images/comments.png"
                alt="commentImg"
              />
              <h4>IN TECH 0 Comments</h4>
            </div>
            <h5 className={MainStyles.asidePostBoxTitle}>
              4. 자바스크립트 특징과 역사 | 웹 모르는 개발자
            </h5>
            <div className={MainStyles.asidePostBoxBottom}>
              <span className={MainStyles.aisdePostTime}>9 days ago</span>
              <div className={MainStyles.verticalBar} />
              <span className={MainStyles.asidePostViews}>14 views</span>
              <div className={MainStyles.verticalBar} />
              <span className={MainStyles.aisdePostLikes}>0 Likes</span>
            </div>
          </article>
          <span id={MainStyles.asidePostBoxBottomLine} />
        </aside>
      </main>
    </>
    // <>
    //   <header>
    //     <div id={MainStyles.title}>
    //       <h1>Joshua_World</h1>
    //       <img
    //         id={MainStyles.headerImg}
    //         alt="headerImg"
    //         src={'/images/headerImg.png'}
    //       />
    //     </div>
    //     <Nav />
    //   </header>
    //   <div id={MainStyles.main}>
    //     <div id={MainStyles.mainWrap}>
    //       <nav id={MainStyles.sideBar}>
    //         <div id={MainStyles.sideBarOne}>
    //           <img
    //             id={MainStyles.myImg}
    //             alt="myImg"
    //             src={
    //               userInfoData
    //                 ? `http://localhost:3000/${userImg}`
    //                 : '/images/myProfile.png'
    //             }
    //           />
    //           <div id={MainStyles.sideBarOneContent}>
    //             <span id={MainStyles.userName}>
    //               {userInfoData?.user_name ? userInfoData.user_name : userName}
    //             </span>
    //             <div id={MainStyles.editButtonWrap}>
    //               <button id={MainStyles.editButton} onClick={showEditModal}>
    //                 Edit
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //         <div id={MainStyles.sideBarTwo}>
    //           <div id={MainStyles.navData}>
    //             <div
    //               id={MainStyles.category}
    //               onClick={() => {
    //                 setCategoryVisible(!categoryVisible);
    //               }}
    //             >
    //               category
    //             </div>
    //             {categoryVisible && (
    //               <ul>
    //                 {navList.map(navData => (
    //                   <li
    //                     key={navData['id']}
    //                     className={MainStyles.navDataContent}
    //                   >
    //                     <span
    //                       onClick={selectCategory}
    //                       className={MainStyles.navDataContentTitle}
    //                     >
    //                       {navData['category']}
    //                     </span>
    //                   </li>
    //                 ))}
    //               </ul>
    //             )}
    //           </div>
    //         </div>
    //         <div id={MainStyles.searchBox}>
    //           <input
    //             placeholder="검색"
    //             id={MainStyles.search}
    //             onChange={searchUsersInput}
    //           />
    //           <img
    //             id={MainStyles.searchIcon}
    //             alt="searchIcon"
    //             src="/images/search.png"
    //           />
    //         </div>
    //       </nav>
    //       <div id={MainStyles.mainContent}>
    //         <div id={MainStyles.listWrap}>
    //           <div id={MainStyles.list}>
    //             <TopListData topListData={listData} />
    //           </div>
    //         </div>
    //       </div>
    //       <MainContent MainContentListData={listData} />
    //     </div>
    //     {modalOpen && (
    //       <Modal setModalOpen={showEditModal} handleUserData={handleUserData} />
    //     )}
    //   </div>
    // </>
  );
}

export default Main;
