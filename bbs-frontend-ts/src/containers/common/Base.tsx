import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { State } from 'store/modules';
import { bindActionCreators } from 'redux';
import { authActions } from 'store/modules/auth';
import ModalContainer from 'containers/modals/ModalContainer';

interface BaseProps {
  AuthActions: typeof authActions;
  logged: boolean;
  history: any;
}

class Base extends React.Component<BaseProps> {
  public componentDidMount() {
    this.checkLogged();
  }

  public checkLogged = async () => {
    const { AuthActions } = this.props;
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      AuthActions.tempLogin();
      return;
    }

    try {
      if (!userInfo) {
        return;
      }
      await AuthActions.check(JSON.parse(userInfo).token);
    } catch (e) {
      this.props.history.push('/auth/login');
    }
  };
  public render() {
    return (
      <>
        <ModalContainer />
      </>
    );
  }
}

export default connect(
  ({ auth }: State) => ({
    logged: auth.logged,
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(withRouter(Base as any));
