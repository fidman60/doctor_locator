import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, withRouter, Redirect} from "react-router-dom";
import {Provider} from 'react-redux';
import Store from '../Store/configureStore';
import Home from "./home/Home";
import Admin from "./admin/Admin";
import axio from 'axios';
import Login from "./admin/login/Login";
import AdminRoute from "./admin/AdminRoute";
import LoginRoute from "./admin/LoginRoute";
import ResetPassForm from "./admin/login/ResetPassForm";

const redirectTo = '/admin';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            token: '',
            user: undefined,
        }
    }

    componentWillMount() {
        //axio.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJmYjQ1YzRkOWY5ZTJiMTk1NWVlOTg3ZjhiNjMyNWU4MmY5MTgyMjA3YjBjMGFjODQyMTI3MjFjMjYyZDMyZWU1M2E1M2M5YmFkOTI1MTc0In0.eyJhdWQiOiIxIiwianRpIjoiMmZiNDVjNGQ5ZjllMmIxOTU1ZWU5ODdmOGI2MzI1ZTgyZjkxODIyMDdiMGMwYWM4NDIxMjcyMWMyNjJkMzJlZTUzYTUzYzliYWQ5MjUxNzQiLCJpYXQiOjE1NTgyNjU1MjAsIm5iZiI6MTU1ODI2NTUyMCwiZXhwIjoxNTg5ODg3OTIwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.oe8jiDDESq1YO41977bV-JQTxMhZk9a59xXdrhoFPv_mLTiXi8-siKaLvqZJ0Sa9_Kckyq2TpvaOq9foUrQ0Ep2p6BnjDtNQvY_Iq2fWAQsDoFCtq3d5XO6eADbyHPjSX2NGEJivX99JJHezR_QvLo7H1p7FUl7UHFA28M8kbplvM-dTaQAK1-n-SLjQeU09QC6cG7v4n8a0cgYK9GP4DeLzvFbNRe0wNqEcu2j7By3cJDkevvigganI0LsKlQXIQoMmWYP3VO5iFzJy4zRn82fq9KOMEYmf4euqYKI5dIB66MeNZ6EZkyQ-FvW1N9KrtZJU23YJxvKs7oJ1DVB8zIofyprwA06lTlHA0dStX08qQLHtgl_9Zvc1TORS2mg9pldVumEFbhVHkw0XLZvj9fW_viewj8Xf61vWH7aBUQbUQJL6CxSCEn0uzgzgS5wLzl7f9o5cEcdnpKslaCdhm1fKcTJtMOg7Y7FLsAtWOY7SZsiqiz1DAirl6oN02suyOKs5w3jAKgjSTC1IxUfOm8BhrkavCkk_fmGotffyEfqAt8Zd2hjYuEne9TiE1pmpkfe9wsPlKk9R6NSd3EGHwgFiKsHuslm5Z5yI-cuoRcH5kdieT54xaqezq5j_DkklrUYn7LyJFTuFvwYx1lqwaY9g0IESwNaYYAcpeJDyXYw';
        //axio.post('api/details',)
        //    .then(rep => console.log(rep))
        //    .catch(error => console.log(error));

        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ loggedIn: AppState.loggedIn, user: AppState.user, token: AppState.token });
        }
    }

    _handleLoginClick(email, password){
        axio.post('api/login',{
            email: email,
            password: password
        })
            .then(rep => {
                console.log("from _handleLoginClick");
                console.log(rep.data);
                const data = rep.data.success;
                if (data) {
                    let appState = {
                        loggedIn: true,
                        token: data.token,
                        user: data.user
                    };
                    localStorage["appState"] = JSON.stringify(appState);

                    this.setState(appState);
                }
            })
            .catch(error => {
                console.log(error);
                alert("Login failed");
            });
    }

    _handleLogout(e){
        e.preventDefault();
        let appState = {
            loggedIn: false,
            token: '',
            user: undefined
        };
        console.log("log out");
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route
                    path="/reset"
                    component={ResetPassForm}
                />
                <AdminRoute
                    loggedIn={this.state.loggedIn}
                    path="/admin"
                    component={Admin}
                    onLogout={this._handleLogout.bind(this)}
                />
                <LoginRoute
                    loggedIn={this.state.loggedIn}
                    path="/login"
                    component={Login}
                    onLogin={this._handleLoginClick.bind(this)}
                />
            </Switch>
        );
    }

}

const AppContainer = withRouter(props => <App {...props} />);


ReactDOM.render((
    <Provider store={Store}>
        <BrowserRouter>
            <AppContainer/>
        </BrowserRouter>
    </Provider>), document.getElementById('app'));
