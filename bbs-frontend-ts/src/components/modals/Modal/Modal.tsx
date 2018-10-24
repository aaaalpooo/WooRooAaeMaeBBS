import * as React from 'react';
import styles from './Modal.scss';
import * as classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface ModalProps {
  visible: boolean;
  message?: string;
}

const Modal: React.SFC<ModalProps> = ({ visible, message }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className={cx('Modal')}>
      <div className={cx('Close')}>&#10006;</div>
      <div className={cx('Message')}>{message}</div>
    </div>
  );
};

export default Modal;
