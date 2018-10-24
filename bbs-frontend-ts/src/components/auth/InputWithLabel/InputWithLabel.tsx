import * as React from 'react';
import styles from './InputWithLabel.scss';
import * as classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface InputWithLabelProps {
  name: string;
  type: string;
  value?: string;
  placeholder?: string;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

const InputWithLabel: React.SFC<InputWithLabelProps> = props => (
  <div className={cx('InputWithLabel')}>
    <input {...props} />
  </div>
);

export default InputWithLabel;
