import * as React from 'react';
import styles from './Description.scss';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

interface DescriptionProps {
  description: string;
  to: string;
}

const Description: React.SFC<DescriptionProps> = ({ description, to }) => (
  <div className={cx('Description')}>
    <Link to={to} className={cx('Text')}>
      {description}
    </Link>
  </div>
);

export default Description;
