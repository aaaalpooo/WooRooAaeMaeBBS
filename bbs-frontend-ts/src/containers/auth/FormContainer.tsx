import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State } from 'store/modules';
import { withRouter } from 'react-router-dom';
import { authActions, ChangeInputPayload } from 'store/modules/auth';
import AuthForm from 'components/auth/AuthForm';
import { modalActions } from 'store/modules/modal';
import { isEmail } from 'validator';

interface FormContainerReduxProps {
  AuthActions: typeof authActions;
  ModalActions: typeof modalActions;
  username: string;
  password: string;
  passwordCheck: string;
  email: string;
  token: string;
  logged: boolean;
  error: boolean;
  visible: boolean;
  animate: boolean;
}

interface FormContainerProps extends React.Props<any> {
  category: string;
  history: any;
}

class FormContainer extends React.Component<
  FormContainerProps & FormContainerReduxProps
> {
  public componentDidMount() {
    if (this.props.logged) {
      this.props.history.push('/');
    }
  }

  public componentDidUpdate(
    prevProps: FormContainerProps & FormContainerReduxProps,
    prevState: any
  ) {
    if (prevProps.category !== this.props.category) {
      this.initializeInput();
    }
    if (prevProps.logged !== this.props.logged && this.props.logged) {
      this.props.history.push('/');
    }
    if (prevProps.error !== this.props.error && this.props.error) {
      const { ModalActions } = this.props;
      ModalActions.modalAction({ visible: true, openingModal: 'register' });
    }
  }

  public componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeInput();
  }

  public handleChangeInput = (payload: ChangeInputPayload) => {
    const { AuthActions } = this.props;
    AuthActions.changeInput(payload);
  };

  public initializeInput = () => {
    const { AuthActions } = this.props;
    AuthActions.initializeInput();
  };

  public handleLogin = async () => {
    const { AuthActions, username, password } = this.props;

    try {
      await AuthActions.login({ username, password });
      localStorage.setItem(
        'userInfo',
        JSON.stringify({ username, token: this.props.token })
      );
      this.props.history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  public handleRegister = async () => {
    const {
      AuthActions,
      ModalActions,
      username,
      password,
      passwordCheck,
      email,
    } = this.props;

    if (!username || !password || !passwordCheck || !email) {
      AuthActions.manageError({
        error: true,
        errorMessage: '대원! 빠짐없이 입력하라!',
      });
      ModalActions.modalAction({ visible: true, openingModal: 'register' });
      return;
    }

    if (password !== passwordCheck) {
      AuthActions.manageError({
        error: true,
        errorMessage: '대원! 패스워드를 정확히 하라!',
      });
      ModalActions.modalAction({ visible: true, openingModal: 'register' });
      return;
    }

    if (!isEmail(email)) {
      AuthActions.manageError({
        error: true,
        errorMessage: '대원! 이메일을 형식에 맞게 입력하라!',
      });
      ModalActions.modalAction({ visible: true, openingModal: 'register' });
      return;
    }

    try {
      await AuthActions.register({ username, password, passwordCheck, email });
      localStorage.setItem(
        'userInfo',
        JSON.stringify({ username, token: this.props.token })
      );
    } catch (e) {
      console.log(e);
    }
  };

  public render() {
    return (
      <AuthForm
        category={this.props.category}
        username={this.props.username}
        password={this.props.password}
        passwordCheck={this.props.passwordCheck}
        email={this.props.email}
        onChangeInput={this.handleChangeInput}
        onLogin={this.handleLogin}
        onRegister={this.handleRegister}
        modalVisible={this.props.visible}
        modalAnimate={this.props.animate}
      />
    );
  }
}

export default connect(
  ({ auth, modal }: State, ownProps: any) => ({
    username: auth.inputs.username,
    password: auth.inputs.password,
    passwordCheck: auth.inputs.passwordCheck,
    email: auth.inputs.email,
    token: auth.token,
    logged: auth.logged,
    error: auth.error,
    visible: modal.visible,
    animate: modal.animate,
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    ModalActions: bindActionCreators(modalActions, dispatch),
  })
)(withRouter(FormContainer as any));
