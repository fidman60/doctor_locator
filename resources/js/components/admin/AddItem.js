import React, {Component} from 'react';
import LoadingLayer from "./LoadingLayer";
import MsgAlert from "./MsgAlert";

export default class AddItem extends Component {

    componentDidMount() {
        this.initAutocomplete();
    }

    _renderSpecialties(){
        const {ophthalmologist, onCheckSpecialtyChange} = this.props;
        return ophthalmologist.specialties.map(row => {
            return (
                <li key={row.specialty.id}>
                    <span className="custom-checkbox">
                        <input
                            type="checkbox"
                            checked={row.checked}
                            onChange={() => onCheckSpecialtyChange(row)}
                            id={"checkboxAdd"+row.specialty.id}
                        />
                        <label htmlFor="checkbox1" />
                    </span>
                    <label htmlFor={"checkboxAdd"+row.specialty.id}>{row.specialty.label}</label>
                </li>
            );
        });
    }

    initAutocomplete() {
        const autocomplete = new window.google.maps.places.Autocomplete(this.refs.searchBox, {types: ['geocode']});

        autocomplete.setFields(['address_component','geometry','formatted_address']);

        autocomplete.addListener('place_changed', () => {
            const location = autocomplete.getPlace().geometry.location;

            const address = this.props.formatAddress(autocomplete.getPlace().address_components, location);

            this.props.onFormattedAddressChangeForAddingIssue(autocomplete.getPlace().formatted_address);
            this.props.setSelectedAddress(address);

        });
    }

    render() {

        const {
            ophthalmologist,
            onCheckPartenaireACUVUEChange,
            onNomChange,
            onAdresseLine1Change,
            onEmailChange,
            onTeleChange,
            onFormattedAddressChange,
            onCloseModal,
            hasErrorFor,
            renderErrorFor,
            onAddForm,
            loading,
            message,
            onAlertDismiss
        } = this.props;

        return (
            <div id="addEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={onAddForm} autoComplete="false">
                            {loading && <LoadingLayer/>}
                            <div className="modal-header">
                                <h4 className="modal-title">Add Employee</h4>
                                <button type="button" className="close" data-dismiss="modal"
                                        aria-hidden="true" onClick={onCloseModal}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <MsgAlert
                                    render={message.length > 0}
                                    message={message}
                                    onAlertDismiss={onAlertDismiss}
                                />
                                <div className="form-group">
                                    <label>Adresse</label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasErrorFor('ophthalmologist.adresse_line2') || hasErrorFor('ophthalmologist.cp') || hasErrorFor('ophthalmologist.ville') ? 'is-invalid' : ''}`}
                                        value={ophthalmologist.formatted_address}
                                        ref='searchBox'
                                        onChange={onFormattedAddressChange}
                                        autoComplete="off"
                                    />
                                    {(hasErrorFor('ophthalmologist.adresse_line2') || hasErrorFor('ophthalmologist.cp') || hasErrorFor('ophthalmologist.ville'))
                                    && <span className='invalid-feedback'>
                                        <strong>{"Désolé, Vous devez selectionné une adresse suggéré"}</strong>
                                    </span>}
                                </div>
                                <div className="form-group">
                                    <label>Nom</label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasErrorFor('ophthalmologist.nom') ? 'is-invalid' : ''}`}
                                        value={ophthalmologist.nom}
                                        required
                                        onChange={onNomChange}
                                    />
                                    {renderErrorFor('ophthalmologist.nom')}
                                </div>
                                <div className="form-group">
                                    <label>Adresse ligne 1</label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasErrorFor('ophthalmologist.adresse_line1') ? 'is-invalid' : ''}`}
                                        value={ophthalmologist.adresse_line1}
                                        required
                                        onChange={onAdresseLine1Change}
                                    />
                                    {renderErrorFor('ophthalmologist.adresse_line1')}
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className={`form-control ${hasErrorFor('ophthalmologist.email') ? 'is-invalid' : ''}`}
                                        value={ophthalmologist.email}
                                        required
                                        onChange={onEmailChange}
                                    />
                                    {renderErrorFor('ophthalmologist.email')}
                                </div>
                                <div className="form-group">
                                    <label>Téléphone</label>
                                    <input
                                        type="text"
                                        value={ophthalmologist.tele}
                                        className={`form-control ${hasErrorFor('ophthalmologist.tele') ? 'is-invalid' : ''}`}
                                        required
                                        onChange={onTeleChange}
                                    />
                                    {renderErrorFor('ophthalmologist.tele')}
                                </div>
                                <div className="form-group">
                                    <span className="custom-checkbox">
								        <input
                                            type="checkbox"
                                            checked={ophthalmologist.partenaire_acuvue}
                                            onChange={() => onCheckPartenaireACUVUEChange(ophthalmologist.partenaire_acuvue)}
                                            id="checkboxAcuvue"
                                            value="1"
                                        />
								        <label htmlFor="checkboxAcuvue" />
							        </span>
                                    <label htmlFor="checkboxAcuvue">Partenaire ACUVUE</label>
                                </div>
                                <div className="form-group">
                                    <label>Spécialités</label>
                                    <ul style={{listStyleType: 'none', padding: 0}}>
                                        {this._renderSpecialties()}
                                    </ul>
                                    {renderErrorFor('specialties')}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <input type="button" className="btn cancelBtn" data-dismiss="modal"
                                       value="Cancel" onClick={onCloseModal} />
                                <input type="submit" className="btn actionBtn" value="Ajouter" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}