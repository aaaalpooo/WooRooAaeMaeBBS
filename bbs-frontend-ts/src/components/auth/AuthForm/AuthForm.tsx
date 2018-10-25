import * as React from 'react';
import styles from './AuthForm.scss';
import * as classNames from 'classnames/bind';
import InputWithLabel from '../InputWithLabel';
import Button from 'components/common/Button';
import Description from '../Description';
import { ChangeInputPayload } from 'store/modules/auth';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

interface AuthFormProps {
  category: string;
  username: string;
  password: string;
  passwordCheck: string;
  email: string;
  modalVisible: boolean;
  modalAnimate: boolean;
  onChangeInput(payload: ChangeInputPayload): void;
  onLogin(): void;
  onRegister(): void;
}

const AuthForm: React.SFC<AuthFormProps> = ({
  category,
  username,
  password,
  passwordCheck,
  email,
  onChangeInput,
  onLogin,
  onRegister,
  modalVisible,
  modalAnimate,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeInput({ name: e.target.name, value: e.target.value });
  };
  const handleKeyPressLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!modalVisible && !modalAnimate) {
      if (e.key === 'Enter') {
        onLogin();
      }
    }
  };
  const handleKeyPressRegister = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!modalVisible && !modalAnimate) {
      if (e.key === 'Enter') {
        console.log(modalVisible);
        onRegister();
      }
    }
  };
  if (category === 'login') {
    return (
      <div className={cx('AuthForm')}>
        <div className={cx('LogoWrapper')}>
          <Link to={`/`} className={cx('BigLogo')}>
            우뢰매 게시판
          </Link>
          <div className={cx('FormWrapper')}>
            <div className={cx('Logo')}>Login</div>
            <div className={cx('Contents')}>
              <InputWithLabel
                type="text"
                name="username"
                placeholder="대원의 아이디"
                onChange={handleChange}
                value={username}
              />
              <InputWithLabel
                type="password"
                name="password"
                placeholder="대원의 고유 암호"
                onChange={handleChange}
                value={password}
                onKeyPress={handleKeyPressLogin}
              />
              <Button title={'로그인'} theme="Login" onClick={onLogin} />
              <Description
                to={'/auth/register'}
                description={'아직 가입이 안되었나?'}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={cx('AuthForm')}>
      <div className={cx('LogoWrapper')}>
        <Link to={`/`} className={cx('BigLogo')}>
          우뢰매 게시판
        </Link>
        <div className={cx('FormWrapper')}>
          <div className={cx('Logo')}>Register</div>
          <div className={cx('Contents')}>
            <InputWithLabel
              type="text"
              name="username"
              placeholder="대원의 아이디"
              onChange={handleChange}
              value={username}
            />
            <InputWithLabel
              type="password"
              name="password"
              placeholder="대원의 고유 암호"
              onChange={handleChange}
              value={password}
            />
            <InputWithLabel
              type="password"
              name="passwordCheck"
              placeholder="대원의 고유 암호 확인"
              onChange={handleChange}
              value={passwordCheck}
            />
            <InputWithLabel
              type="email"
              name="email"
              placeholder="대원의 전자우편 주소"
              onChange={handleChange}
              value={email}
              onKeyPress={handleKeyPressRegister}
            />
            <Button title={'가입하기'} theme="Login" onClick={onRegister} />
            <Description to={'/auth/login'} description={'이미 가입되었나?'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
