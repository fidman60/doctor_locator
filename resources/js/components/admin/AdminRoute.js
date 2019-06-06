import React from "react";
import {Route, Redirect} from 'react-router-dom';

export default function AdminRoute ({component: Component, loggedIn, logout, ...rest}) {

    return (
        <Route
            exact
            {...rest}
            render={(props) => loggedIn === true
                ? <Component {...props} onLogout={rest.onLogout} logout={logout} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    )
}