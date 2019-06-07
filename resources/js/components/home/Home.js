import React from 'react';
import ErrorAlert from "./ErrorAlert";
import Header from "./Header";
import Map from "./Map";
import {googleApiToken} from "../../config/tokens";
import OphthalmologistsList from "./OphthalmologistsList";
import Footer from "./Footer";

export default class Home extends React.Component {

    componentDidMount(){
        document.title = "Doctor Locator";
    }

    render() {
        return (
            <div>
                <ErrorAlert/>
                <Header/>
                <Map
                    googleMapURL={"https://maps.googleapis.com/maps/api/js?key="+googleApiToken+"&libraries=geometry,drawing,places"}
                    loadingElement={<div>Chargement...</div>}
                    containerElement={ <div style={{width: '100%', height: '400px'}} /> }
                    mapElement={ <div style={{ height: `100%` }} /> }
                />
                <OphthalmologistsList />
                <Footer/>
            </div>
        );
    }

}