import React from "react";
import {Route, Redirect} from 'react-router-dom';

export default function AdminRoute ({component: Component, loggedIn, ...rest}) {

    return (
        <Route
            {...rest}
            render={(props) => loggedIn === true
                ? <Component {...props} onLogout={rest.onLogout} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    )
}