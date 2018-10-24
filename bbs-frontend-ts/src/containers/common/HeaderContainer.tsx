import * as React from 'react';
import Header from 'components/common/Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { State } from 'store/modules';
import { bindActionCreators } from 'redux';
import { authActions } from 'store/modules/auth';

interface HeaderContainerProps {
  AuthActions: typeof authActions;
  logged: boolean;
  history: any;
}

class HeaderContainer extends React.Component<HeaderContainerProps> {
  public handleLogout = async () => {
    const { AuthActions } = this.props;
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      return;
    }
    try {
      await AuthActions.logout(JSON.parse(userInfo).token);
      localStorage.removeItem('userInfo');
      this.props.history.push('/auth/login');
    } catch (e) {
      console.log(e);
    }
  };
  public render() {
    return <Header logged={this.props.logged} onLogout={this.handleLogout} />;
  }
}

export default connect(
  ({ auth }: State) => ({
    logged: auth.logged,
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(withRouter(HeaderContainer as any));
