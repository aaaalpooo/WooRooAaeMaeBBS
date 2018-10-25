import * as React from 'react';
import Header from 'components/common/Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { State } from 'store/modules';
import { bindActionCreators } from 'redux';
import { authActions } from 'store/modules/auth';
import { menuActions } from 'store/modules/menu';

interface HeaderContainerProps {
  AuthActions: typeof authActions;
  MenuActions: typeof menuActions;
  logged: boolean;
  history: any;
  sidebarVisible: boolean;
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

  public handleSidebar = (visible: boolean) => {
    const { MenuActions } = this.props;
    MenuActions.manageMenuVisible(visible);
  };

  public render() {
    return (
      <Header
        logged={this.props.logged}
        onLogout={this.handleLogout}
        onSidebar={this.handleSidebar}
        sidebarVisible={this.props.sidebarVisible}
      />
    );
  }
}

export default connect(
  ({ auth, menu }: State) => ({
    logged: auth.logged,
    sidebarVisible: menu.visible,
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    MenuActions: bindActionCreators(menuActions, dispatch),
  })
)(withRouter(HeaderContainer as any));
