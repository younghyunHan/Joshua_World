import Link from 'next/link';

import NavStyles from './Nav.module.css';

function Nav() {
  return (
    <nav id={NavStyles.headerMenuWrap}>
      <ul id={NavStyles.headerMenu}>
        <div id={NavStyles.headerMenuLeft}>
          <Link href="/">
            <span id={NavStyles.goToHome}>HOME</span>
          </Link>
          <Link href="/post">
            <span id={NavStyles.goToPost}>POST</span>
          </Link>
        </div>
        <div id={NavStyles.headerMenuRight}>
          {/* <Link href="/SignIn">
          <span id={NavStyles.goToSignIn}>
            {access_token ? '로그아웃' : '로그인'}
            로그아웃
          </span>
        </Link> */}
          <img
            id={NavStyles.searchIcon}
            alt="searchIcon"
            src="/images/search.png"
          />
          <img id={NavStyles.userIcon} alt="userIcon" src="/images/user.png" />
        </div>
      </ul>
    </nav>
  );
}

export default Nav;
