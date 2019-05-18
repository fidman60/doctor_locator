import React, {Component} from 'react';
import {GoogleMap, InfoWindow, Marker, withGoogleMap} from 'react-google-maps';
import {connect} from "react-redux";
import {
    callGetBoundsFuncAction,
    changeCenterAndCurrentPlace,
    markersAction,
    SET_IN_BOUNDS_MARKERS,
    SET_MARKERS,
    setErrorMessage,
} from "../../Actions/mapActions";
import axios from 'axios';
import DetailInfoWindow from "./DetailInfoWindow";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import {filterMarkersByDistance} from "../../Utils/utils";

class Map extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedMarker: undefined,
        };

        this._map = undefined;

        this._handleBoundsChanged = this._handleBoundsChanged.bind(this);
    }

    componentDidMount() {
        this._getCurrentLocation();
        this._getMarkers();
        this._getExistingBoundsMarkers();
        this._renderMarkers();
    }

    _getMarkers(){
        axios.get('/api/ophthalmologists')
            .then(response => {
                this.props.dispatch(markersAction(SET_MARKERS,response.data));
            })
            .catch(error => {
                this.props.dispatch(setErrorMessage(error));
            });
    }

    _getCurrentLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                this.props.dispatch(changeCenterAndCurrentPlace(pos));

            }, function(error) {
                this.props.dispatch(setErrorMessage(error));
            });
        }
    };

    _getExistingBoundsMarkers(){
        return this.props.markers.filter((marker,index) => {
            let filterLayerBool;
            const {currentPlace, filter} = this.props;

            /*
            console.log("données:"+index+"\n\n\n");
            console.log("currentPlace: lat:" + currentPlace.lat + ", lng:" + currentPlace.lng);
            console.log("filter: " + filter);*/


            // filter layer
            if (currentPlace && filter) {

                /*
                console.log("check distance: " + filterMarkersByDistance(currentPlace, {lat: marker.lat, lng: marker.lng}, filter.km));
                console.log("check spectialty: " + marker.specialties.findIndex(specialty => specialty.id === parseInt(filter.specialty)) > -1);
                */

                filterLayerBool = filterMarkersByDistance(currentPlace, {lat: marker.lat, lng: marker.lng}, filter.km)
                    && marker.specialties.findIndex(specialty => specialty.id === parseInt(filter.specialty)) > -1;

                const villeOrCp = filter.villeOrCp.trim();
                let villeOrCpVerifyRegex = true;

                if (villeOrCp.length > 0) {
                    villeOrCpVerifyRegex = new RegExp('^'+marker.cp+'$','i').test(villeOrCp)
                        || new RegExp('^'+marker.ville+'$','i').test(villeOrCp);
                }

                //console.log("check villeOrCP: " + villeOrCpVerifyRegex);

                filterLayerBool = filterLayerBool && villeOrCpVerifyRegex;
            } else {
                filterLayerBool = true;
            }

            //console.log("check total: "+filterLayerBool);

            return filterLayerBool && this._map.getBounds().contains({
                lat: marker.lat,
                lng: marker.lng
            });
        });
    }

    _handleBoundsChanged(){
        this.props.dispatch(markersAction(SET_IN_BOUNDS_MARKERS, this._getExistingBoundsMarkers()));
    }

    _renderMarkers(){
        const {inBoundsMarkers} = this.props;

        return inBoundsMarkers.map((item,index) => (
            <Marker
                position={{lat: item.lat, lng: item.lng}}
                title={item.nom}
                label={{
                    text: (index+1)+'',
                    color: "white"
                }}
                key={item.id}
                onClick={this._handleMarkerClick.bind(this,item)}
                icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/"+(item.partenaire_acuvue ? "red" : "blue")+".png",
                    size: new window.google.maps.Size(50,50),
                    labelOrigin: new window.google.maps.Point(16,10),
                }}
            >
                {this._renderWindowInfo(item)}
            </Marker>
        ));
    }

    _renderCurrentPlaceMarker(){
        const {currentPlace} = this.props;
        if (currentPlace) {
            return (
                <Marker
                    position={currentPlace}
                    title="Lieu source"
                    icon={{
                        url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
                        size: new window.google.maps.Size(50,50),
                    }}
                />
            )
        }
    }

    _renderWindowInfo(marker){
        return marker === this.state.selectedMarker && <InfoWindow
            onCloseClick={() => this.setState({selectedMarker: undefined})}
        >
            <div>
                <DetailInfoWindow
                    ophto={marker}
                />
            </div>
        </InfoWindow>;
    }

    _handleMarkerClick(marker,event){
        this._map.panTo({
            lat: marker.lat,
            lng: marker.lng,
        });

        this.setState({
            selectedMarker: marker,
        });
    }

    render(){
        if (this.props.callGetExistingBoundsMarkers) {
            this.props.dispatch(markersAction(SET_IN_BOUNDS_MARKERS, this._getExistingBoundsMarkers()));
            this.props.dispatch(callGetBoundsFuncAction(false));
        }

        return (
            <GoogleMap
                center={this.props.position}
                zoom={this.props.zoom}
                ref={(map) => this._map = map}
                onBoundsChanged={this._handleBoundsChanged}
            >
                <MarkerClusterer
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                >
                    {this._renderCurrentPlaceMarker()}
                    {this._renderMarkers()}
                </MarkerClusterer>
            </GoogleMap>
        );
    }

}

const mapStateToProps = state => ({
    position: state.position,
    zoom: state.zoom,
    markers: state.markers,
    inBoundsMarkers: state.inBoundsMarkers,
    currentPlace: state.currentPlace,
    filter: state.filter,
    callGetExistingBoundsMarkers: state.callGetExistingBoundsMarkers,
    message: state.message,
});

export default connect(mapStateToProps)(withGoogleMap(Map));