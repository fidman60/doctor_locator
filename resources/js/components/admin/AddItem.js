import React, {Component} from 'react';
import LoadingLayer from "./LoadingLayer";

export default class AddItem extends Component {

    componentDidMount() {
        this.initAutocomplete();
    }

    _renderSpecialties(){
        const {specialties} = this.props;
        return specialties.map(specialty => {
            return (
                <li key={specialty.id}>
                    <span className="custom-checkbox">
                        <input
                            type="checkbox"
                            id={"checkboxAdd"+specialty.id}
                        />
                        <label htmlFor={"checkboxAdd"+specialty.id} />
                    </span>
                    <label htmlFor={"checkbox"+specialty.id}>{specialty.label}</label>
                </li>
            );
        });
    }

    initAutocomplete() {
        const autocomplete = new window.google.maps.places.Autocomplete(this.refs.searchBox, {types: ['geocode']});

        autocomplete.setFields(['address_component','geometry']);

        autocomplete.addListener('place_changed', () => {
            const location = autocomplete.getPlace().geometry.location;

            console.log(autocomplete.getPlace());

        });
    }

    render() {
        return (
            <div id="addEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h4 className="modal-title">Add Employee</h4>
                                <button type="button" className="close" data-dismiss="modal"
                                        aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Adresse</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        ref='searchBox'
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nom</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Adresse ligne 1</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Téléphone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <span className="custom-checkbox">
								        <input
                                            type="checkbox"
                                            id="checkboxAcuvueAdd"
                                            value="1"
                                        />
								        <label htmlFor="checkboxAcuvueAdd" />
							        </span>
                                    <label htmlFor="checkboxAcuvueAdd">Partenaire ACUVUE</label>
                                </div>
                                <div className="form-group">
                                    <label>Spécialités</label>
                                    <ul style={{listStyleType: 'none', padding: 0}}>
                                        {this._renderSpecialties()}
                                    </ul>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <input type="button" className="btn cancelBtn" data-dismiss="modal"
                                       value="Cancel" />
                                <input type="submit" className="btn actionBtn" value="Save" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}