import React from 'react';
import MsgAlert from "../MsgAlert";
import axio from "axios";

export default class ResetForm extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            errors: [],
            message: '',
            loadingForm: '',
            error: false,
        };
    }

    componentDidMount() {
        document.title = "Réinitialiser le mot de passe"
    }

    _handleSendForm(e){
        e.preventDefault();

        this.setState({
            loadingForm: true,
            errors: [],
        });

        const data = {
            email: this.refs.email.value,
            password: this.refs.password.value,
            password_confirmation: this.refs.c_password.value,
            token: this.props.token
        };

        axio.post('api/password/reset',data)
            .then(response => {
                this.setState({
                    message: "Le mot de passe a été bien reinitiallisé !",
                    loadingForm: false,
                    error: false,
                });
                this.refs.email.value = '';
                this.refs.password.value = '';
                this.refs.c_password.value = '';
                console.log(response);
            })
            .catch(error => {
                if (error.response.data.errors){
                    this.setState({
                        errors: error.response.data.errors,
                        loadingForm: false,
                    });
                } else {
                    this.setState({
                        message: "Le jeton de réinitialisation de mot de passe ou l'email est invalide",
                        loadingForm: false,
                        error: true,
                    })
                }
            });
    }

    _renderAlertDismiss(e){
        e.preventDefault();
        this.setState({
            message: ''
        });
    }

    _hasErrorFor(field){
        return !!this.state.errors[field];
    }

    _renderErrorFor(field) {
        if (this._hasErrorFor(field)) {
            return (
                <span style={{fontFamily: 'arial', color: '#FF5581', fontWeight: 'normal', fontSize: '11px', marginBottom: '20px', display: 'block'}}>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    render() {
        return (
            <div id="loginSection" className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form
                            className="login100-form validate-form"
                            autoComplete="off"
                            onSubmit={this._handleSendForm.bind(this)}
                        >
                                <span className="login100-form-title p-b-43">
                                    Réinitialiser le mot de passe
                                </span>

                            <MsgAlert
                                render={this.state.message.length > 0}
                                message={this.state.message}
                                onAlertDismiss={this._renderAlertDismiss.bind(this)}
                                error={this.state.error}
                            />

                            <div className="wrap-input100 validate-input"
                                 data-validate="L'email est nécessaire: ex@abc.xyz">
                                <input
                                    type="email"
                                    className="input100 has-val"
                                    required
                                    ref="email"
                                />
                                <span className="focus-input100" />
                                <span className="label-input100">Email</span>
                            </div>
                            {this._renderErrorFor('email')}


                            <div className="wrap-input100 validate-input" data-validate="Le mot de passe est nécessaire">
                                <input
                                    type="password"
                                    className="input100 has-val"
                                    required
                                    ref="password"
                                />
                                <span className="focus-input100" />
                                <span className="label-input100">Le nouveau mot de passe</span>
                            </div>


                            <div className="wrap-input100 validate-input" data-validate="Vous devez confirmer le mot de passe">
                                <input
                                    type="password"
                                    className="input100 has-val"
                                    required
                                    ref="c_password"
                                />
                                <span className="focus-input100" />
                                <span className="label-input100">Confirmer le mot de passe</span>
                            </div>
                            {this._renderErrorFor('password')}

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">
                                    {this.state.loadingForm && <i className="fas fa-circle-notch fa-spin" style={{
                                        display: 'inline-block',
                                        marginRight: '5px'
                                    }} />} Réinitialiser
                                </button>
                            </div>

                        </form>

                        <div
                            className="login100-more"
                            style={{
                                backgroundImage: "url('images/bg-01.jpg')"
                            }}
                        >
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}