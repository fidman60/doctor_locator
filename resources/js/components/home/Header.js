import React, {Component} from 'react';
import Search from "./Search";
import axio from 'axios';
import {connect} from "react-redux";
import {callGetBoundsFuncAction, filterOptions, setErrorMessage} from "../../Actions/mapActions";

class Header extends Component {

    constructor(props){
        super(props);

        this.state = {
            specialties: [],
        };

        this._handleFilterClick = this._handleFilterClick.bind(this);
    }

    componentWillMount(){
        axio.get("api/specialities")
            .then(response => this.setState({specialties: response.data}))
            .catch(error => this.props.dispatch(setErrorMessage("Le chargement des specialités a été echoué, svp rechargez la currentPage")));
    }

    _handleFilterClick(){
        this.props.dispatch(filterOptions(  {
            km: this.refs.kmInput.value,
            specialty: this.refs.specialtySelect.value,
            villeOrCp: this.refs.cpOrCity.value,
        }));

        this.props.dispatch(callGetBoundsFuncAction(true));
    }

    render(){
        return (
            <header>
                <div className="header-logo text-center">
                    <h2 style={{fontSize: '18px'}}><a href="/" style={{color: '#333333'}}><span className="font-weight-bold">Doctor</span> Locator</a></h2>
                </div>

                <Search />

                <div id="dd" className="collapse navbar-collapse" style={{position: 'relative', zIndex: 999}}>
                    <div className="search-toggle">
                        <div className="container">
                            <div className="row itemOption">
                                <div className="col-12">
                                    <div className="slidecontainer">
                                        <p>
                                            <span className="label">Distance :</span>
                                            <span className="float-right"><span id="demo" />km</span>
                                        </p>
                                        <input
                                            type="range"
                                            min={1} max={100}
                                            defaultValue={1}
                                            className="slider"
                                            id="myRange"
                                            ref="kmInput"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="itemOption">
                                <span className="label">Location :</span>
                                <div className="row">
                                    <div className="col-6 form-group">
                                        <i className="fas fa-user-md form-control-icon" />
                                        <select style={{marginTop: 0}} className="select-country form-group input-icon" ref="specialtySelect">
                                            {this.state.specialties.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-6 region form-group">
                                        <i className="fas fa-city form-control-icon" />
                                        <input type="text" className="form-group input-icon" placeholder="Code postale ou ville (Optionel)" ref="cpOrCity"/>
                                    </div>
                                </div>
                            </div>
                            <div className="itemOption">
                                <button
                                    className="search-btn filter-btn float-right"
                                    type="submit"
                                    onClick={this._handleFilterClick}
                                    data-toggle="collapse"
                                    data-target="#dd"
                                    aria-controls="dd"
                                    aria-expanded="false"
                                    aria-label="Toggle"
                                >
                                    <i className="fas fa-filter" /> Filtrer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    filter: state.filter,
    inBoundsMarkers: state.inBoundsMarkers,
    callGetExistingBoundsMarkers: state.callGetExistingBoundsMarkers,
    message: state.message,
});

export default connect(mapStateToProps)(Header);