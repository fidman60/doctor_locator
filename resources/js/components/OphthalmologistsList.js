import React, {Component} from 'react';
import {connect} from "react-redux";
import OphthalmologistItem from './OphthalmologistItem';
import axios from 'axios';
import {changeCenterAction} from "../Actions/mapActions";
import Alert from "./Alert";

class OphthalmologistsList extends Component {

    constructor(props){
        super(props);
        this.state = {
            favorites: [],
        };

        this.fovoritesCurrentIndex = 0;

        this._renderOphtoList = this._renderOphtoList.bind(this);
    }

    componentDidMount() {
        axios.post('api/ophthalmologists/get_favorites')
            .then(response => {
                this.setState({
                    favorites: response.data
            })})
            .catch((error) => console.log(error));
    }

    _renderOphtoList(){
        if (this.props.inBoundsMarkers.length === 0)
            return <Alert msg="La liste est vide"/>;

        const list = this.props.inBoundsMarkers.map((ophthalmologist, index) => (
            <OphthalmologistItem
                key={ophthalmologist.id}
                ophthalmologist = {ophthalmologist}
                index = {index}
                onClick={this._handleToggleFavoriteClick.bind(this,ophthalmologist)}
                favorites={this.state.favorites}
                forceFavorite={false}
                onItemClick={this._handleItemClick.bind(this,ophthalmologist)}
            />
        ));

        return (
            <table className="table table-hover responsive">
                <tbody>
                {list}
                </tbody>
            </table>
        )
    }

    _handleItemClick(ophthal){
        this.props.dispatch(changeCenterAction({
            lat: ophthal.lat,
            lng: ophthal.lng,
        }));
    }

    _renderFavoritesOphtoList(){
        if (this.state.favorites.length === 0)
            return <Alert msg="La liste est vide"/>;

        this.fovoritesCurrentIndex = 0;
        const list = this.props.markers.map((ophthalmologist) => {
            const foundIndex = this.state.favorites.findIndex(id => id === ophthalmologist.id);
            return foundIndex > -1 && <OphthalmologistItem
                key={ophthalmologist.id}
                ophthalmologist = {ophthalmologist}
                index={this.fovoritesCurrentIndex++}
                onClick={this._handleToggleFavoriteClick.bind(this,ophthalmologist)}
                favorites={this.state.favorites}
                forceFavorite={true}
                onItemClick={this._handleItemClick.bind(this,ophthalmologist)}
            />
        });

        return (
            <table className="table table-hover responsive">
                <tbody>
                {list}
                </tbody>
            </table>
        );
    }

    _handleToggleFavoriteClick(ophto, e){
        e.stopPropagation();
        e.preventDefault();
        const id = ophto.id;

        axios.post('api/ophthalmologists/toggle_favorite',{id: id})
            .then(response => {
                console.log(response);
                axios.post('api/ophthalmologists/get_favorites')
                    .then(response => {
                        this.setState({
                            favorites: response.data
                        })
                    })
                    .catch((error) => console.log(error));
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <section className=" ">
                <nav className="nav-justified ">
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a className="nav-item nav-link active" id="pop1-tab" data-toggle="tab" href="#pop1" role="tab" aria-controls="pop1" aria-selected="true">Liste <span className="badge badge-light">{this.props.inBoundsMarkers.length}</span></a>
                        <a className="nav-item nav-link" id="pop2-tab" data-toggle="tab" href="#pop2" role="tab" aria-controls="pop2" aria-selected="false">Favoris <span className="badge badge-light">{this.state.favorites.length}</span></a>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="pop1" role="tabpanel" aria-labelledby="pop1-tab">
                        <div style={{height: '335px'}} className="table-responsive" id="listAlphas">
                            {this._renderOphtoList()}
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pop2" role="tabpanel" aria-labelledby="pop2-tab">
                        <div style={{height: '335px'}} className="table-responsive" id="listFavoris">
                            {this._renderFavoritesOphtoList()}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    position: state.position,
    markers: state.markers,
    inBoundsMarkers: state.inBoundsMarkers,
});

export default connect(mapStateToProps)(OphthalmologistsList);