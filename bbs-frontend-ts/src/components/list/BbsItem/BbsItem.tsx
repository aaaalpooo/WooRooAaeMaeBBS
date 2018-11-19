import * as React from 'react';
import styles from './BbsItem.scss';
import * as classNames from 'classnames/bind';
import * as moment from 'moment';
import 'moment/locale/ko';

const cx = classNames.bind(styles);

interface BbsItemProps {
  id: number;
  username: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

const BbsItem: React.SFC<BbsItemProps> = ({
  username,
  content,
  createdAt,
  updatedAt,
}) => (
  <div className={cx('BbsItem')}>
    <div className={cx('Content')}>{content}</div>
    <div className={cx('Divider')} />
    <div className={cx('Username')}>{username}</div>
    <div className={cx('CreatedAt')}>
      {updatedAt
        ? moment(updatedAt)
            .startOf('day')
            .fromNow()
        : moment(createdAt)
            .startOf('day')
            .fromNow()}
    </div>
  </div>
);

export default BbsItem;
