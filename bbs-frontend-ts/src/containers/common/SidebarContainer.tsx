import * as React from 'react';
import { connect } from 'react-redux';
import { State } from 'store/modules';
import { bindActionCreators } from 'redux';
import { menuActions } from 'store/modules/menu';
import { withRouter } from 'react-router';
import Sidebar from 'components/common/Sidebar';

interface SidebarContainerProps {
  MenuActions: typeof menuActions;
  visible: boolean;
}

class SidebarContainer extends React.Component<SidebarContainerProps> {
  public componentWillUnmount() {
    const { MenuActions } = this.props;
    MenuActions.manageMenuVisible(false);
  }
  public render() {
    return <Sidebar visible={this.props.visible} />;
  }
}

export default connect(
  ({ menu }: State) => ({
    visible: menu.visible,
  }),
  dispatch => ({
    MenuActions: bindActionCreators(menuActions, dispatch),
  })
)(withRouter(SidebarContainer as any));
