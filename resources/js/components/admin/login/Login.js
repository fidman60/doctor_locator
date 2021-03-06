import React from "react";
import '../../../styles/login/main2.css';
import '../../../styles/login/util2.css';
import '../../../styles/crud.css';
import MsgAlert from "../MsgAlert";
import axio from 'axios';

export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            message: '',
            error: false,
        }
    }

    _handleSubmit(e){
        e.preventDefault();

        if (this.props.connecting) return;
        const email = this.refs.email;
        const password = this.refs.password;
        this.props.onLogin(email.value,password.value);
    }

    componentDidMount() {

        document.title = "Se connecter";
        // solve issue
        const p = document.querySelector('.modal-backdrop');
        if (p) p.style.display = "none" ;

        (function ($) {
            "use strict";


            /*==================================================================
            [ Focus Contact2 ]*/
            $('.input100').each(function(){
                if($(this).val().trim() != "") {
                    $(this).addClass('has-val');
                }
                $(this).on('blur', function(){
                    if($(this).val().trim() != "") {
                        $(this).addClass('has-val');
                    }
                    else {
                        $(this).removeClass('has-val');
                    }
                })
            });


            /*==================================================================
            [ Validate ]*/
            var input = $('.validate-input .input100');

            $('.validate-form').on('submit',function(){
                var check = true;

                for(var i=0; i<input.length; i++) {
                    if(validate(input[i]) == false){
                        showValidate(input[i]);
                        check=false;
                    }
                }

                return check;
            });


            $('.validate-form .input100').each(function(){
                $(this).focus(function(){
                    hideValidate(this);
                });
            });

            function validate (input) {
                if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
                    if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                        return false;
                    }
                }
                else {
                    if($(input).val().trim() == ''){
                        return false;
                    }
                }
            }

            function showValidate(input) {
                var thisAlert = $(input).parent();

                $(thisAlert).addClass('alert-validate');
            }

            function hideValidate(input) {
                var thisAlert = $(input).parent();

                $(thisAlert).removeClass('alert-validate');
            }


        })(jQuery);
    }

    _handleReset(e){
        e.preventDefault();

        if (this.state.loading) return;

        this.setState({
            loading: true
        });

        axio.post('api/password/create',{email: this.refs.emailReset.value})
            .then(response => {
                this.refs.emailReset.value = '';
                this.setState({
                    message: 'Nous avons envoyé votre lien de réinitialisation de mot de passe par e-mail!',
                    loading: false,
                    error: false,
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    message: 'Une erreur s\'est produite. Veuillez réessayer',
                    loading: false,
                    error: true
                })
            });
    }

    _handleAlertDismiss(e){
        e.preventDefault();
        this.setState({
            message: ''
        });
    }

    render() {
        return (
            <div>
                <div id="loginSection" className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <form
                                className="login100-form validate-form"
                                autoComplete="off"
                                onSubmit={this._handleSubmit.bind(this)}
                            >
                                <span className="login100-form-title p-b-43">
                                    S'authentifier
                                </span>

                                <MsgAlert
                                    render={this.props.loginMessage.length > 0}
                                    message={this.props.loginMessage}
                                    onAlertDismiss={this.props.onAlertDismiss}
                                    error={true}
                                />

                                <div className="wrap-input100 validate-input"
                                     data-validate="Valid email is required: ex@abc.xyz">
                                    <input
                                        ref='email'
                                        className="input100"
                                        type="text"
                                        name="email"
                                        required
                                    />
                                    <span className="focus-input100" />
                                    <span className="label-input100">Email</span>
                                </div>


                                <div className="wrap-input100 validate-input" data-validate="Password is required">
                                    <input
                                        ref='password'
                                        className="input100"
                                        type="password"
                                        name="password"
                                        required
                                    />
                                    <span className="focus-input100" />
                                    <span className="label-input100">Mot de passe</span>
                                </div>

                                <div className="flex-sb-m w-full p-t-3 p-b-32">
                                    <div>
                                        <a href="#resetPassModel" className="txt1" data-toggle="modal">
                                            <i className="fas fa-sync-alt" style={{marginRight: '5px'}} /> <span>Réinitialiser le mot de passe</span>
                                        </a>
                                    </div>
                                </div>


                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn">
                                        {this.props.connecting && <i className="fas fa-circle-notch fa-spin" style={{marginRight: '5px'}} />} Se connecter
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
                <div id="resetPassModel" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form className="col-12" onSubmit={this._handleReset.bind(this)}>
                                <div className="modal-header">
                                    <h4 className="modal-title">Réinitialiser le mot de passe</h4>
                                    <button type="button" className="close" data-dismiss="modal"
                                            aria-hidden="true">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <MsgAlert
                                        render={this.state.message.length > 0}
                                        message={this.state.message}
                                        onAlertDismiss={this._handleAlertDismiss.bind(this)}
                                        error={this.state.error}
                                    />
                                    <div className="form-row">
                                        <label className="col-sm-2 col-form-label">Email</label>
                                        <input
                                            type="email"
                                            className='form-control col-sm-10'
                                            required
                                            ref="emailReset"
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer" style={{padding: "20px 0"}}>
                                    <input type="button" className="btn cancelBtn" data-dismiss="modal"
                                           value="Annuler" />
                                    <button type="submit" className="btn" style={{background: '#6675df',color: 'white',padding: "10px"}}>
                                        {this.state.loading && <i className="fas fa-circle-notch fa-spin" />} Réinitialiser
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}