import React from 'react';
import queryString from 'query-string';
import axio from 'axios';
import {Redirect} from 'react-router-dom';
import MsgAlert from "../MsgAlert";

export default class ResetPassForm extends React.Component {

    constructor(props){
        super(props);

        this.params = queryString.parse(this.props.location.search);

        this.state = {
            found: false,
            loading: true,
            errors: [],
            message: '',
            loadingForm: ''
        };
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
            token: this.params.token
        };

        axio.post('api/password/reset',data)
            .then(response => {
                this.setState({
                    message: "Le mot de passe a été bien reinitiallisé",
                    loadingForm: false,
                });
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
                        message: "Le jeton de réinitialisation de mot de passe ou l'email sont invalides",
                        loadingForm: false,
                    })
                }
            });
    }

    componentWillMount() {

        if (this.params.token.length > 0) {
            axio.get("api/password/find/"+this.params.token)
                .then((response) => {
                    this.setState({
                        found: true,
                        loading: false,
                    });
                })
                .catch((error) => {
                    this.setState({
                        loading: false,
                    });
                });
        }
    }

    _renderAlertDismiss(e){
        e.preventDefault();
        this.setState({
            message: ''
        });
    }

    _renderForm(){
        return (
            <div>
                <form className="col-sm-6 offset-sm-3" onSubmit={this._handleSendForm.bind(this)}>
                    <MsgAlert
                        render={this.state.message.length > 0}
                        message={this.state.message}
                        onAlertDismiss={this._renderAlertDismiss.bind(this)}
                        global={true}
                    />
                    <div className="modal-header">
                        <h4 className="modal-title">Réinitialiser le mot de passe</h4>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="text"
                                className={`form-control ${this._hasErrorFor('email') ? 'is-invalid' : ''}`}
                                required
                                ref="email"
                            />
                            {this._renderErrorFor('email')}
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Mot de passe</label>
                            <input
                                type="password"
                                className={`form-control ${this._hasErrorFor('password') ? 'is-invalid' : ''}`}
                                required
                                ref="password"
                            />
                            {this._renderErrorFor('password')}
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Confirmer mot de passe</label>
                            <input
                                type="password"
                                className="form-control"
                                required
                                ref="c_password"
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn actionBtn">
                            {this.state.loadingForm && <i className="fas fa-circle-notch fa-spin" />} Réinitialiser
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    _hasErrorFor(field){
        return !!this.state.errors[field];
    }

    _renderErrorFor(field) {
        if (this._hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    render() {
        return this.state.loading ? <div>Loading...</div> : this.state.found ? this._renderForm() : <div>Invalid token</div>
    }

}