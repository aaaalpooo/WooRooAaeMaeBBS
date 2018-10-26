import * as React from 'react';
import WriteBox from 'components/write/WriteBox';
import { connect } from 'react-redux';
import { State } from 'store/modules';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { writeActions } from 'store/modules/write';

interface WriteBoxContainerProps {
  WriteActions: typeof writeActions;
  text: string;
}

class WriteBoxContainer extends React.Component<WriteBoxContainerProps> {
  public handleChange = (text: string) => {
    const { WriteActions } = this.props;
    WriteActions.changeInput(text);
  };

  public render() {
    return <WriteBox text={this.props.text} onChange={this.handleChange} />;
  }
}

export default connect(
  ({ write }: State) => ({
    text: write.text,
  }),
  dispatch => ({
    WriteActions: bindActionCreators(writeActions, dispatch),
  })
)(withRouter(WriteBoxContainer as any));
