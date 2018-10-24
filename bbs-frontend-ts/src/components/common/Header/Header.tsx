import * as React from 'react';
import styles from './Header.scss';
import * as classNames from 'classnames/bind';
import Button from '../Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

interface HeaderProps {
  logged: boolean;
  onLogout(): void;
}

const Header: React.SFC<HeaderProps> = ({ logged, onLogout }) => (
  <div className={cx('Header')}>
    <div className={cx('CenterWrapper')}>
      <div className={cx('Left-Zone')} />
      <Link to={`/`} className={cx('Logo')}>
        우뢰매 게시판
      </Link>
      <div className={cx('Right-Zone')}>
        {!logged ? (
          <Button to={`/auth/login`} title={'로그인'} />
        ) : (
          <Button onClick={onLogout} title={'로그아웃'} />
        )}
      </div>
    </div>
  </div>
);

export default Header;
