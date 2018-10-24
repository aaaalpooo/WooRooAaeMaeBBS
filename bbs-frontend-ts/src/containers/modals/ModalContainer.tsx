import * as React from 'react';
import { connect } from 'react-redux';
import { State } from 'store/modules';
import { withRouter } from 'react-router-dom';
import Modal from 'components/modals/Modal';

// interface ModalContainerProps {}

class ModalContainer extends React.Component<{}> {
  public render() {
    return <Modal visible={true} message={'My Message'} />;
  }
}

export default connect(
  ({ auth }: State) => ({}),
  dispatch => ({})
)(withRouter(ModalContainer as any));
