import * as React from 'react';
import styles from './Footer.scss';
import * as classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// interface FooterProps {}

const Footer: React.SFC<{}> = () => (
  <div className={cx('Footer')}>
    <div className={cx('Description')}>
      이곳은 우뢰매 게시판이다. 알아서 글을 쓰도록.
    </div>
  </div>
);

export default Footer;
