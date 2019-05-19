import React from "react";

export default class Login extends React.Component {

    _handleSubmit(e){
        e.preventDefault();
        const email = this.refs.email;
        const password = this.refs.password;
        this.props.onLogin(email.value,password.value);
    }

    render() {
        return (
            <div id="main">
                <form id="login-form" action="" onSubmit={this._handleSubmit.bind(this)} method="post">
                    <h3 style={{ padding: 15 }}>Login Form</h3>
                    <input
                        ref='email'
                        autoComplete="off"
                        id="email-input"
                        name="email"
                        type="text"
                        className="center-block"
                        placeholder="email"
                    />
                    <input
                        ref='password'
                        autoComplete="off"
                        id="password-input"
                        name="password"
                        type="password"
                        className="center-block"
                        placeholder="password"
                    />
                    <button type="submit" className="landing-page-btn center-block text-center" id="email-login-btn" href="#facebook" >
                        Login
                    </button>
                </form>
            </div>
        );
    }

}