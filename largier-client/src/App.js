import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminRouteContainer from './common/components/AdminRouteContainer';
import routes from './routes';
import './App.less';

const App = () => (
  <main>
    <Switch>
      {
        routes.map((route, index) => {
          if (route.admin) {
            return (
              <AdminRouteContainer
                key={String(index + 1)}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
            );
          }
          return (
            <Route
              key={String(index + 1)}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          );
        })
      }
    </Switch>
  </main>
);

export default App;
