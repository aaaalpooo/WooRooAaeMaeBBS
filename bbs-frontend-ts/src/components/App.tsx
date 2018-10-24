import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BbsMain, AuthPage } from 'pages';
import Base from 'containers/common/Base';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact={true} path="/" component={BbsMain} />
        <Route path="/auth/login" component={AuthPage} />
        <Route path="/auth/register" component={AuthPage} />
      </Switch>
      <Base />
    </div>
  );
};

export default App;
