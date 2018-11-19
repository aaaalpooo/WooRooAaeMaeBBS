import * as React from 'react';
import { connect } from 'react-redux';
import { State } from 'store/modules';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { listActions, BbsItem } from 'store/modules/list';
import List from 'components/list/List';
import { getScrollBottom } from '../../lib/common';
import { throttle } from 'lodash';

interface ListContainerProps {
  list: [BbsItem?];
  getListPending: boolean;
  isLastPage: boolean;
  ListActions: typeof listActions;
}

class ListContainer extends React.Component<ListContainerProps> {
  public state = {
    page: 1,
  };

  private handleScroll = throttle(() => {
    const scrollBottom: number = getScrollBottom();
    if (scrollBottom > 1000 || this.props.isLastPage) return;
    this.getNextPageItems();
  }, 250);

  public componentDidMount() {
    this.addListeners();
    this.getList();
  }

  public componentWillUnmount() {
    this.removeListeners();
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
      this.setState({
        page: this.state.page + 1,
      });
    } catch (e) {
      console.log(e);
    }
  };

  private addListeners = () => {
    if (window) {
      window.addEventListener('scroll', this.handleScroll);
    }

    if (document && document.body) {
      document.addEventListener('scroll', this.handleScroll);
    }
  };

  private removeListeners = () => {
    if (window) {
      window.removeEventListener('scroll', this.handleScroll);
    }

    if (document && document.body) {
      document.removeEventListener('scroll', this.handleScroll);
    }
  };

  private getNextPageItems = async () => {
    const { getListPending } = this.props;
    if (getListPending) {
      return;
    }
    try {
      await this.getList();
    } catch (e) {
      console.log(e);
    }
  };
}

export default connect(
  ({ list, pender }: State) => ({
    list: list.list,
    getListPending: pender.pending['list/GET_LIST'],
    isLastPage: list.isLastPage,
  }),
  dispatch => ({
    ListActions: bindActionCreators(listActions, dispatch),
  })
)(withRouter(ListContainer as any));
