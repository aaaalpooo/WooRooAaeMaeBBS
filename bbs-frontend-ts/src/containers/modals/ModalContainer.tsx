import * as React from 'react';
import { connect } from 'react-redux';
import { State } from 'store/modules';
import { withRouter } from 'react-router-dom';
import Modal from 'components/modals/Modal';
import { bindActionCreators } from 'redux';
import { modalActions } from 'store/modules/modal';
import { authActions } from 'store/modules/auth';

interface ModalContainerProps {
  AuthActions: typeof authActions;
  ModalActions: typeof modalActions;
  visible: boolean;
  message: string;
  animate: boolean;
}

class ModalContainer extends React.Component<ModalContainerProps> {
  public componentDidMount() {
    this.injectEventListeners();
  }

  public componentWillUnmount() {
    this.deinjectEventListeners();
  }

  public componentDidUpdate(prevProps: ModalContainerProps, prevState: any) {
    if (this.props.visible !== prevProps.visible) {
      this.startAnimation();
    }
  }

  public closeModal = () => {
    const { ModalActions, AuthActions } = this.props;
    AuthActions.manageError({ error: false, errorMessage: '' });
    ModalActions.modalAction({ visible: false, openingModal: '' });
  };

  public startAnimation = () => {
    const { ModalActions } = this.props;
    ModalActions.setAnimate(true);
    setTimeout(() => {
      ModalActions.setAnimate(false);
    }, 250);
  };

  public handleKeyPress = (e: KeyboardEvent) => {
    if (!this.props.visible) {
      return;
    }
    if (e.key === 'Escape' || e.key === 'Enter') {
      this.closeModal();
    }
  };

  public injectEventListeners = () => {
    if (window) {
      window.addEventListener('keydown', this.handleKeyPress);
      return;
    }
    document.addEventListener('keydown', this.handleKeyPress);
  };

  public deinjectEventListeners = () => {
    if (window) {
      window.removeEventListener('keydown', this.handleKeyPress);
      return;
    }
    document.removeEventListener('keydown', this.handleKeyPress);
  };

  public render() {
    return (
      <Modal
        visible={this.props.visible}
        message={this.props.message}
        animate={this.props.animate}
        onClose={this.closeModal}
      />
    );
  }
}

export default connect(
  ({ modal, auth }: State) => ({
    visible: modal.visible,
    message: auth.errorMessage,
    animate: modal.animate,
  }),
  dispatch => ({
    ModalActions: bindActionCreators(modalActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(withRouter(ModalContainer as any));
