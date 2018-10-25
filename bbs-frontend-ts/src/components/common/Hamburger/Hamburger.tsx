import * as React from 'react';
import styles from './Hamburger.scss';
import * as classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface HamburgerProps {
  visible: boolean;
  onClick(visible: boolean): void;
}

const Hamburger: React.SFC<HamburgerProps> = ({ onClick, visible }) => {
  const handleClick = () => {
    if (!visible) {
      onClick(true);
      return;
    }

    onClick(false);
  };
  return (
    <div className={cx('BurgerWrapper')} onClick={handleClick}>
      <div
        className={cx(
          'hamburger',
          'hamburger--elastic',
          visible && 'is-active'
        )}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner" />
        </span>
      </div>
    </div>
  );
};

export default Hamburger;
