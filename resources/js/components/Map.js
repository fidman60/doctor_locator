import React, {Component} from 'react';
import {GoogleMap, withGoogleMap} from 'react-google-maps';
import {connect} from "react-redux";
import {changeCenterAction} from "../Actions/mapActions";

class Map extends Component {

    componentDidMount() {
        this._getCurrentLocation();
    }

    _getCurrentLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                this.props.dispatch(changeCenterAction(pos));

            }, function(error) {
                console.log(error);
            });
        }
    };

    render(){
        return (
            <GoogleMap
                center={this.props.position}
                zoom={this.props.zoom}
                ref='map'
            />
        );
    }

}

const mapStateToProps = state => ({
    position: state.position,
    zoom: state.zoom,
});

export default connect(mapStateToProps)(withGoogleMap(Map));