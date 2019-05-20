import React from "react";
import '../../../styles/login/main2.css';
import '../../../styles/login/util2.css';

export default class Login extends React.Component {

    _handleSubmit(e){
        e.preventDefault();
        const email = this.refs.email;
        const password = this.refs.password;
        this.props.onLogin(email.value,password.value);
    }

    componentDidMount() {
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

    render() {
        return (
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


                            <div className="wrap-input100 validate-input"
                                 data-validate="Valid email is required: ex@abc.xyz">
                                <input
                                    ref='email'
                                    className="input100"
                                    type="text"
                                    name="email"
                                    autoComplete={false}
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
                                    autoComplete={false}
                                />
                                <span className="focus-input100" />
                                <span className="label-input100">Mot de passe</span>
                            </div>

                            <div className="flex-sb-m w-full p-t-3 p-b-32">

                                <div>
                                    <a href="#" className="txt1">
                                        Mot de passe oublier?
                                    </a>
                                </div>
                            </div>


                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">
                                    Se connecter
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