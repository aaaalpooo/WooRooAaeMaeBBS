import * as React from 'react';
import { connect } from 'react-redux';
import { State } from 'store/modules';
import { bindActionCreators } from 'redux';
import { menuActions } from 'store/modules/menu';
import { withRouter } from 'react-router';
import Sidebar from 'components/common/Sidebar';
import { authActions } from 'store/modules/auth';
import onClickOutside from 'react-onclickoutside';

interface SidebarContainerProps {
  MenuActions: typeof menuActions;
  AuthActions: typeof authActions;
  visible: boolean;
  logged: boolean;
  history: any;
}

class SidebarContainer extends React.Component<SidebarContainerProps> {
  public componentWillUnmount() {
    const { MenuActions } = this.props;
    MenuActions.manageMenuVisible(false);
  }

  public handleLogout = async () => {
    const { AuthActions } = this.props;
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      return;
    }
    try {
      await AuthActions.logout(JSON.parse(userInfo).token);
      localStorage.removeItem('userInfo');
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  public handleClickOutside = (e: any) => {
    const { MenuActions, visible } = this.props;
    if (!visible) {
      return;
    }
    MenuActions.manageMenuVisible(false);
  };

  public render() {
    return (
      <Sidebar
        visible={this.props.visible}
        logged={this.props.logged}
        onLogout={this.handleLogout}
      />
    );
  }
}

export default connect(
  ({ menu, auth }: State) => ({
    visible: menu.visible,
    logged: auth.logged,
  }),
  dispatch => ({
    MenuActions: bindActionCreators(menuActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(withRouter(onClickOutside(SidebarContainer as any) as any));
