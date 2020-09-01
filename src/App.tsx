import React from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom';
import './App.less';
import Login from './pages/login/Login';
import Admin from './pages/admin/Admin';
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route component={Login} path="/login" exact />
        <Route component={Admin} path="/admin" exact />
      </Switch>
    </HashRouter>
  );
}

export default App;
