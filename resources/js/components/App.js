import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from "./Header";
import Map from "./Map";
import {googleApiToken} from "../config/tokens";
import {Provider} from 'react-redux';
import Store from '../Store/configureStore';
import OphthalmologistsList from "./OphthalmologistsList";
import ErrorAlert from './ErrorAlert';


class App extends Component {

    render() {
        return (
            <Provider store={Store}>
                <BrowserRouter>
                    <div>
                        <ErrorAlert/>
                        <Header />
                        <Map
                            googleMapURL={"https://maps.googleapis.com/maps/api/js?key="+googleApiToken+"&libraries=geometry,drawing,places"}
                            loadingElement={<div>Fidman Loading</div>}
                            containerElement={ <div style={{width: '100%', height: '400px'}} /> }
                            mapElement={ <div style={{ height: `100%` }} /> }
                        />
                        <OphthalmologistsList />
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }

}

ReactDOM.render(<App />, document.getElementById('app'));
