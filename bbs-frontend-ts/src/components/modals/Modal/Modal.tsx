import * as React from 'react';
import styles from './Modal.scss';
import * as classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface ModalProps {
  visible: boolean;
  message?: string;
  animate: boolean;
  onClose(): void;
}

const Modal: React.SFC<ModalProps> = ({
  visible,
  message,
  onClose,
  animate,
}) => {
  if (!visible && !animate) {
    return null;
  }
  const animation = visible ? 'Opening' : 'Closing';

  return (
    <div className={cx('ModalWrapper')} onClick={onClose}>
      <div className={cx('Modal')}>
        <div className={cx('ModalContentWrapper', animation)}>
          <div className={cx('Close')} onClick={onClose}>
            {/* &#10006; */}
          </div>
          <div className={cx('Message')}>{message}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
