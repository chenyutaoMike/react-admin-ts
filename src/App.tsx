import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.less';
import Login from './pages/login/Login';
import Admin from './pages/admin/Admin.jsx';
import store from './store'
import { Provider } from 'react-redux'
function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route component={Login} path="/login"  exact/>
          <Route component={Admin} path="/"  />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
