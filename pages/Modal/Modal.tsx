import React, { useEffect, useRef, useState, useCallback } from 'react';
import ModuleStyles from './Modal.module.css';
import axios from 'axios';

export default function Modal({ setModalOpen, handleUserData }) {
  const access_token = localStorage.getItem('token');
  const modalRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 이름, 비밀번호
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  //오류 메시지 상태저장
  const [nameMessage, setNameMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');

  // 유효성 검사
  const [isName, setIsName] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const clickModalOutside = (event: any) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', clickModalOutside);
    // 지정한 이벤트가 대상에 전달될 때마다 호출할 함수를 설정
    // 스스로 종료되지 않기 때문에 removeEventListener를 명시해야 종료할 수 있다
    // document.addEventListener : 전체 document 페이지에 대한 이벤트이므로,
    // 특정 컴포넌트 안에서만 발생된다는 착각은 금물!!

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', clickModalOutside);
    };
  });

  // 이름
  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMessage('2글자 이상 5글자 미만으로 입력해주세요.');
      setIsName(false);
    } else {
      setNameMessage('올바른 이름 형식입니다 :)');
      setIsName(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage(
          '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!',
        );
        setIsPassword(false);
      } else {
        setPasswordMessage('안전한 비밀번호에요 :)');
        setIsPassword(true);
      }
    },
    [],
  );

  const onUploadUserInfoButtonClick = useCallback(
    (event: any) => {
      event.preventDefault();
      if (!inputRef.current) {
        return;
      }

      // console.log(inputRef.current?.files?.[0].name);
      const files = inputRef.current.files as FileList;

      const formData = new FormData();
      // formData.append('image', inputRef.current?.files?.[0].name);
      formData.append('user_img', files[0]);
      formData.append('user_name', name);
      formData.append('user_pw', password);

      axios
        .post('http://localhost:3000/userInfoUpdate', formData, {
          headers: {
            Authorization: `${access_token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(function (response) {
          if (response.data.message === 'SUCCESS') {
            alert('변경되었습니다.');
            setModalOpen(false);
            handleUserData(
              response.data.user_name,
              response.data.user_img.filename,
            );
          }
        });
    },
    [name, password],
  );

  return (
    <>
      <form ref={modalRef} id={ModuleStyles.modal}>
        <div id={ModuleStyles.modalWrap}>
          <input
            id={ModuleStyles.userName}
            type="text"
            name="user_name"
            placeholder="닉네임"
            onChange={onChangeName}
          />
          {name.length > 0 && (
            <span
              className={`${
                isName ? `${ModuleStyles.success}` : `${ModuleStyles.error}`
              }`}
            >
              {nameMessage}
            </span>
          )}
          <input
            id={ModuleStyles.userPassword}
            type="password"
            name="user_pw"
            placeholder="비밀번호 (숫자 + 영문자 + 특수문자 조합으로 8자리 이상)"
            onChange={onChangePassword}
          />
          {password.length > 0 && (
            <span
              className={`${
                isPassword ? `${ModuleStyles.success}` : `${ModuleStyles.error}`
              }`}
            >
              {passwordMessage}
            </span>
          )}
          <input
            id={ModuleStyles.userImg}
            type="file"
            accept="image/*"
            ref={inputRef}
          />
        </div>
        <button
          id={ModuleStyles.editSubmitBtn}
          onClick={onUploadUserInfoButtonClick}
        >
          개인 정보 수정{' '}
        </button>
      </form>
      <div></div>
    </>
  );
}
