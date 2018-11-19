import * as React from 'react';
import { connect } from 'react-redux';
import { State } from 'store/modules';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { listActions, BbsItem } from 'store/modules/list';
import List from 'components/list/List';

interface ListContainerProps {
  list: [BbsItem?];
  ListActions: typeof listActions;
}

class ListContainer extends React.Component<ListContainerProps> {
  public state = {
    page: 1,
  };

  public componentDidMount() {
    this.getList();
  }

  public render() {
    const { list } = this.props;
    if (list.length === 0) {
      return null;
    }
    return <List list={list} />;
  }

  private getList = async () => {
    const { ListActions } = this.props;
    const { page } = this.state;
    try {
      await ListActions.getList({ page });
    } catch (e) {
      console.log(e);
    }
  };
}

export default connect(
  ({ list }: State) => ({
    list: list.list,
  }),
  dispatch => ({
    ListActions: bindActionCreators(listActions, dispatch),
  })
)(withRouter(ListContainer as any));
