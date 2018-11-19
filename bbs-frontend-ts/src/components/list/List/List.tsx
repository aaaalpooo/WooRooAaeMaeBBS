import * as React from 'react';
import styles from './List.scss';
import * as classNames from 'classnames/bind';
import { BbsItem } from 'store/modules/list';
import Item from '../BbsItem';

const cx = classNames.bind(styles);

interface ListProps {
  list: [BbsItem?];
}

const List: React.SFC<ListProps> = ({ list }) => {
  const bbsItems = list.map((bbs: BbsItem, i) => {
    return (
      <Item
        key={bbs.id}
        id={bbs.id}
        content={bbs.content}
        username={bbs.username}
        createdAt={bbs.createdAt}
        updatedAt={bbs.updatedAt}
      />
    );
  });

  return <div className={cx('ListWrapper')}>{bbsItems}</div>;
};

export default List;
