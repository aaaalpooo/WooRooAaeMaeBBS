import * as React from 'react';
import styles from './Sidebar.scss';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

interface SidebarProps {
  visible: boolean;
}

const Sidebar: React.SFC<SidebarProps> = ({ visible }) => (
  <div className={cx('Sidebar', visible ? 'Opening' : 'Closing')}>
    <Link to={'/auth/login'} className={cx('Menu')}>
      로그인
    </Link>
    <Link to={'/auth/register'} className={cx('Menu')}>
      회원가입
    </Link>
  </div>
);

export default Sidebar;
