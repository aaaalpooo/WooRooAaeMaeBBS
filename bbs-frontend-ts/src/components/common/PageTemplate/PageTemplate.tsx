import * as React from 'react';
import styles from './PageTemplate.scss';
import * as classNames from 'classnames/bind';
import Footer from '../Footer';
import HeaderContainer from 'containers/common/HeaderContainer';
import SidebarContainer from 'containers/common/SidebarContainer';

const cx = classNames.bind(styles);

// interface PageTemplateProps {}

const PageTemplate: React.SFC<{}> = ({ children }) => (
  <div className={cx('PageTemplate')}>
    <HeaderContainer />
    <SidebarContainer />
    <main>{children}</main>
    <Footer />
  </div>
);

export default PageTemplate;
