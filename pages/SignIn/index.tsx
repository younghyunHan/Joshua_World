import { useState, useCallback, useEffect, useRef } from 'react';

import React from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import Nav from '../../components/Nav/Nav';

import SignInStyles from './SignIn.module.css';

export default function Index() {
  //이름, 이메일, 비밀번호, 비밀번호 확인
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  //오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>('');

  // 유효성 검사
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const signIn = (event: any) => {
    event.preventDefault();
    fetch('http://localhost:3000/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: email,
        user_pw: password,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.token) {
          localStorage.setItem('token', result.token);
          alert('환영합니다.');
          router.push('/');
        } else if (result.message === 'INVALID_USER') {
          alert('ID와 PW를 확인해주세요.');
        }
      });
  };

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
      <div id={SignInStyles.signIn}>
        <form id={SignInStyles.signInForm}>
          <div id={SignInStyles.signInFormTop}>
            <h1 id={SignInStyles.signInFormName}>Blog</h1>
            <div id={SignInStyles.signInFormTopContent}>
              <div id={SignInStyles.signInTitle}>Sign In</div>
              <input
                id={SignInStyles.userId}
                ref={inputRef}
                type="text"
                name="user_id"
                placeholder="전화번호, 사용자 이름 또는 이메일"
                onChange={onChangeEmail}
              />
              {email.length > 0 && (
                <span
                  className={`${
                    isEmail
                      ? `${SignInStyles.success}`
                      : `${SignInStyles.error}`
                  }`}
                >
                  {emailMessage}
                </span>
              )}
              <input
                id={SignInStyles.userPassword}
                type="password"
                name="user_pw"
                placeholder="비밀번호"
                onChange={onChangePassword}
              />
              {password.length > 0 && (
                <span
                  className={`${
                    isPassword
                      ? `${SignInStyles.success}`
                      : `${SignInStyles.error}`
                  }`}
                >
                  {passwordMessage}
                </span>
              )}
              <input
                id={SignInStyles.userPassword}
                type="password"
                name="user_pw_confirm"
                placeholder="비밀번호 확인"
                onChange={onChangePasswordConfirm}
              />
              {passwordConfirm.length > 0 && (
                <span
                  className={`${
                    isPasswordConfirm
                      ? `${SignInStyles.success}`
                      : `${SignInStyles.error}`
                  }`}
                >
                  {passwordConfirmMessage}
                </span>
              )}
            </div>
          </div>
          <div id={SignInStyles.SignInBtnWrap}>
            <button
              type="button"
              className={`${SignInStyles.signInBtn} ${
                isEmail && isPassword && isPasswordConfirm
                  ? `${SignInStyles.signInBtnLive}`
                  : ''
              }`}
              onClick={signIn}
              disabled={!(isEmail && isPassword && isPasswordConfirm)}
            >
              Sign In
            </button>
            <Link href="/SignUp">
              <button type="button" id={SignInStyles.goToSignUp}>
                Sign Up
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
