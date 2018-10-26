import * as React from 'react';
import styles from './Sidebar.scss';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

interface SidebarProps {
  visible: boolean;
  logged: boolean;
  onLogout(): void;
}

const Sidebar: React.SFC<SidebarProps> = ({ visible, logged, onLogout }) => (
  <div className={cx('Sidebar', visible ? 'Opening' : 'Closing')}>
    {!logged
      ? [
          <Link key="login" to={'/auth/login'} className={cx('Menu')}>
            로그인
          </Link>,
          <Link key="register" to={'/auth/register'} className={cx('Menu')}>
            회원가입
          </Link>,
        ]
      : [
          <div key="logout" className={cx('Menu')} onClick={onLogout}>
            로그아웃
          </div>,
        ]}
  </div>
);

export default Sidebar;
