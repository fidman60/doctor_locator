import React from "react";
import {Route, Redirect} from 'react-router-dom';

export default function LoginRoute ({component: Component, loggedIn, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => loggedIn === false
                ? <Component {...props} onLogin={rest.onLogin} loginMessage={rest.loginMessage} connecting={rest.connecting} onAlertDismiss={rest.onAlertDismiss} />
                : <Redirect to={{pathname: '/admin', state: {from: props.location}}} />}
        />
    )
}