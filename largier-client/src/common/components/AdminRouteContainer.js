/**
 * Created by Henry Huang.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const AdminRouteContainer = ({ component: Component, auth, ...rest }) => {
  const isAuthenticated = auth && auth.token && auth.role === 'admin';
  // TODO if auth is null read from store
  return (
    <Route
      {...rest}
      render={routeProps => (
        isAuthenticated
          ? <Component {...routeProps} />
          : (
            <Redirect to={{
              pathname: '/login',
              state: { from: routeProps.location },
            }}
            />
          )
      )
      }
    />
  );
};

AdminRouteContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  component: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

export default connect(mapStateToProps)(AdminRouteContainer);
