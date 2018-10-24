import * as React from 'react';
import styles from './Button.scss';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

interface ButtonProps {
  title: string;
  to?: string;
  theme?: string;
  onClick?(): void;
}

class Button extends React.Component<ButtonProps> {
  public render() {
    if (this.props.to) {
      return (
        <Link className={cx('Button', this.props.theme)} to={this.props.to}>
          {this.props.title}
        </Link>
      );
    }
    return (
      <div
        className={cx('Button', this.props.theme)}
        onClick={this.props.onClick}
      >
        {this.props.title}
      </div>
    );
  }
}

export default Button;
