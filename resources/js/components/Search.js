import React, {Component} from 'react';
import {changeCenterAndCurrentPlace, filterOptions} from "../Actions/mapActions";
import {connect} from "react-redux";

class Search extends Component {

    initAutocomplete() {
        // Create the autocomplete object, restricting the search predictions to
        // geographical location types.
        const autocomplete = new window.google.maps.places.Autocomplete(this.refs.searchBox, {types: ['geocode']});

        // Avoid paying for data that you don't need by restricting the set of
        // place fields that are returned to just the address components.
        autocomplete.setFields(['address_component','geometry']);

        // When the user selects an address from the drop-down, populate the
        // address fields in the form.
        autocomplete.addListener('place_changed', () => {
            const location = autocomplete.getPlace().geometry.location;
            this.props.dispatch(changeCenterAndCurrentPlace({
                lat: location.lat(),
                lng: location.lng()
            }));

            this.props.dispatch(filterOptions(undefined));
        });
    }

    componentDidMount() {
        this.initAutocomplete();
    }

    render(){
        return (
            <div style={{position: 'relative'}} id="secondBlockHeader">
                <div className="container">
                    <div id="searchBox">
                        <button type="button" data-toggle="collapse" data-target="#dd" aria-controls="dd" aria-expanded="false" aria-label="Toggle" className="toggle-btn"><i className="fa fa-bars" /></button>
                        <div style={{flexGrow: 6}} className="search-value">
                            <div id="searchGeo" className="form-group">
                                <span className="fa fa-map-marker-alt form-control-icon" />
                                <input
                                    type="text"
                                    className="form-control input-icon"
                                    placeholder="Rechercher"
                                    ref='searchBox'
                                />
                            </div>
                        </div>
                        <div className="search-btn"><i className="fa fa-search search-div" /></div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    position: state.position,
    currentPlace: state.currentPlace,
    filter: state.filter
});

export default connect(mapStateToProps)(Search);