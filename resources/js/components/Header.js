import React, {Component} from 'react';
import Search from "./Search";

export default class Header extends Component {

    render(){
        return (
            <header>
                <div className="header-logo text-center">
                    <h2><a href="index.html">GL<i className="fa fa-globe" />BO</a></h2>
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
                                            <span className="float-right"><span id="demo" />KM</span>
                                        </p>
                                        <input
                                            type="range"
                                            min={1} max={100}
                                            defaultValue={1}
                                            className="slider"
                                            id="myRange"
                                            ref="fidman"
                                            onInput={() => console.log(this.refs.fidman)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="itemOption">
                                <span className="label">Location :</span>
                                <div className="row">
                                    <div className="col-6 form-group">
                                        <i className="fas fa-user-md form-control-icon" />
                                        <select style={{marginTop: 0}} className="select-country form-group input-icon">
                                            <option value="option1">Spécialité</option>
                                            <option value="option1">option 1</option>
                                            <option value="option2">option 2</option>
                                            <option value="option3">option 3</option>
                                        </select>
                                    </div>
                                    <div className="col-6 region form-group">
                                        <i className="fas fa-city form-control-icon" />
                                        <input type="text" className="form-group input-icon" placeholder="Code postale ou ville" />
                                    </div>
                                </div>
                            </div>
                            <div className="itemOption">
                                <button className="search-btn filter-btn float-right" type="submit"><i className="fas fa-filter" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
