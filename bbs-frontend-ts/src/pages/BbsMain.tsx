import * as React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import WriteBoxContainer from 'containers/write/WriteBoxContainer';
import ListContainer from 'containers/list/ListContainer';

const BbsMain = () => {
  return (
    <PageTemplate>
      <WriteBoxContainer />
      <ListContainer />
    </PageTemplate>
  );
};

export default BbsMain;
