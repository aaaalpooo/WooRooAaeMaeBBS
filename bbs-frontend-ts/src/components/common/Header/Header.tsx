import * as React from 'react';
import styles from './Header.scss';
import * as classNames from 'classnames/bind';
// import Button from '../Button';
import { Link } from 'react-router-dom';
import Hamburger from '../Hamburger';

const cx = classNames.bind(styles);

interface HeaderProps {
  logged: boolean;
  sidebarVisible: boolean;
  onLogout(): void;
  onSidebar(visible: boolean): void;
}

const Header: React.SFC<HeaderProps> = ({
  logged,
  onLogout,
  onSidebar,
  sidebarVisible,
}) => (
  <div className={cx('Header')}>
    <div className={cx('CenterWrapper')}>
      <div className={cx('Left-Zone')} />
      <Link to={`/`} className={cx('Logo')}>
        우뢰매 게시판
      </Link>
      <div className={cx('Right-Zone')}>
        {/* <div className={cx('ButtonMenu')}>
          {!logged ? (
            <Button to={`/auth/login`} title={'로그인'} />
          ) : (
            <Button onClick={onLogout} title={'로그아웃'} />
          )}
        </div> */}
        <Hamburger onClick={onSidebar} visible={sidebarVisible} />
      </div>
    </div>
  </div>
);

export default Header;
