import { useCallback, useEffect, useState, useRef } from 'react';

import React from 'react';

import { useRouter } from 'next/router';

import Nav from '../../components/Nav/Nav';

import SignUpStyles from './SignUp.module.css';

export default function Index() {
  //이름, 이메일, 비밀번호, 비밀번호 확인
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  //오류메시지 상태저장
  const [nameMessage, setNameMessage] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>('');

  // 유효성 검사
  const [isName, setIsName] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const signUp = (event: any) => {
    event.preventDefault();
    fetch('http://localhost:3000/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: email,
        user_pw: password,
        user_name: name,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'SUCCESS') {
          alert('회원가입이 완료되었습니다.');
          router.push('/SignIn');
        }
      });
  };

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

  // 이메일
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ');
        setIsEmail(false);
      } else {
        setEmailMessage('올바른 이메일 형식이에요 : )');
        setIsEmail(true);
      }
    },
    [],
  );

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
        setPasswordMessage('안전한 비밀번호에요 : )');
        setIsPassword(true);
      }
    },
    [],
  );

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 : )');
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ');
        setIsPasswordConfirm(false);
      }
    },
    [password],
  );

  return (
    <>
      <Nav />
      <div id={SignUpStyles.signUp}>
        <form id={SignUpStyles.signUpForm}>
          <div id={SignUpStyles.signUpFormTop}>
            <h1 id={SignUpStyles.signUpFormName}>Blog</h1>
            <div id={SignUpStyles.signUpFormTopContent}>
              <div id={SignUpStyles.signUpTitle}>Sign Up</div>
              <input
                id={SignUpStyles.userName}
                ref={inputRef}
                type="text"
                name="user_name"
                placeholder="닉네임"
                onChange={onChangeName}
              />
              {name.length > 0 && (
                <span
                  className={`${
                    isName ? `${SignUpStyles.success}` : `${SignUpStyles.error}`
                  }`}
                >
                  {nameMessage}
                </span>
              )}
              <input
                id={SignUpStyles.userId}
                type="text"
                name="user_id"
                placeholder="이메일"
                onChange={onChangeEmail}
              />
              {email.length > 0 && (
                <span
                  className={`${
                    isEmail
                      ? `${SignUpStyles.success}`
                      : `${SignUpStyles.error}`
                  }`}
                >
                  {emailMessage}
                </span>
              )}
              <input
                id={SignUpStyles.userPassword}
                type="password"
                name="user_pw"
                placeholder="비밀번호 (숫자 + 영문자 + 특수문자 조합으로 8자리 이상)"
                onChange={onChangePassword}
              />
              {password.length > 0 && (
                <span
                  className={`${
                    isPassword
                      ? `${SignUpStyles.success}`
                      : `${SignUpStyles.error}`
                  }`}
                >
                  {passwordMessage}
                </span>
              )}
              <input
                id={SignUpStyles.userPassword}
                type="password"
                name="user_pw_confirm"
                placeholder="비밀번호 확인"
                onChange={onChangePasswordConfirm}
              />
              {passwordConfirm.length > 0 && (
                <span
                  className={`${
                    isPasswordConfirm
                      ? `${SignUpStyles.success}`
                      : `${SignUpStyles.error}`
                  }`}
                >
                  {passwordConfirmMessage}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            className={`${SignUpStyles.signUpBtn} ${
              isName && isEmail && isPassword && isPasswordConfirm
                ? `${SignUpStyles.signUpBtnLive}`
                : ''
            }`}
            onClick={signUp}
            disabled={!(isName && isEmail && isPassword && isPasswordConfirm)}
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
