import React, {Component} from 'react';
import {GoogleMap, Marker, withGoogleMap} from 'react-google-maps';
import {connect} from "react-redux";
import {changeCenterAction,markersAction, SET_MARKERS, SET_IN_BOUNDS_MARKERS} from "../Actions/mapActions";
import axios from 'axios';

class Map extends Component {

    constructor(props){
        super(props);

        this._map = undefined;

        this._handleBoundsChanged = this._handleBoundsChanged.bind(this);
    }

    componentDidMount() {
        this._getCurrentLocation();
        this._getMarkers();
    }

    _getMarkers(){
        axios.get('/api/ophthalmologists')
            .then(response => {
                this.props.dispatch(markersAction(SET_MARKERS,response.data));
            })
            .catch(error => {
                console.log(error);
            });
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

    _getExistingBoundsMarkers(){
        return this.props.markers.filter((marker) => {
            return this._map.getBounds().contains({
                lat: marker.lat,
                lng: marker.lng
            });
        });
    }

    _handleBoundsChanged(){
        this.props.dispatch(markersAction(SET_IN_BOUNDS_MARKERS, this._getExistingBoundsMarkers()));
    }

    render(){
        return (
            <GoogleMap
                center={this.props.position}
                zoom={this.props.zoom}
                ref={(map) => this._map = map}
                onBoundsChanged={this._handleBoundsChanged}
            />
        );
    }

}

const mapStateToProps = state => ({
    position: state.position,
    zoom: state.zoom,
    markers: state.markers,
    inBoundsMarkers: state.inBoundsMarkers
});

export default connect(mapStateToProps)(withGoogleMap(Map));