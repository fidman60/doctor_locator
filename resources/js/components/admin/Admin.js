import React from 'react';
import axio from 'axios';
import '../../styles/crud.css';
import Item from "./Item";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";
import LoadingLayer from "./LoadingLayer";

let defaultOphtho = {
    id: 0,
    nom: '',
    adresse_line1: '',
    adresse_line2: '',
    cp: '',
    ville: '',
    tele: '',
    email: '',
    partenaire_acuvue: 0,
    lat: 0,
    lng: 0,
    specialties: [],
    formatted_address: ''
};

const defaultSelectedAddress = {
    adresse_line2: '',
    ville: '',
    cp: undefined,
    lat: undefined,
    lng: undefined,
};

export default class Admin extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            ophthalmologists: [],
            page: 1,
            selectedOphthalmologist: defaultOphtho,
            errors: [],
            loading: false,
            message: '',
            globalMessage: '',
            total: 0,
            loadingList: false,
            insertLoading: false,
            insertMessage: '',
        };

        this.specialties = [];
        this.selectedAddress = defaultSelectedAddress;
    }

    componentWillMount() {
        axio.get(`api/paginate/ophthalmologists?page=${this.state.page}`)
            .then(response => {
                this.setState({
                    ophthalmologists: response.data.data
                })
            })
            .catch(error => console.log(error));

        axio.get("api/specialities")
            .then(response => this.specialties = response.data)
            .catch(error => console.log(error));

        axio.get("api/count")
            .then(response => {
                this.setState({
                    total: response.data.count,
                })
            })
            .catch(error => console.log(error));
    }

    setSelectedAddress(addr){
        this.selectedAddress = addr;
    }

    _formatSpecialties(specialties, ophthalmologist){
        return specialties.map(specialty => ({
            specialty: specialty,
            checked: ophthalmologist.specialties.findIndex(ophthoSpecialty => specialty.id === ophthoSpecialty.id) > -1,
        }));
    }

    _handleAjoutBtnClick(e){
        e.preventDefault();
        let specialties = this._formatSpecialties(this.specialties, this.state.selectedOphthalmologist);
        this.setState({
            selectedOphthalmologist: {
                ...this.state.selectedOphthalmologist,
                specialties: specialties,
            }
        });
    }

    _handleActionBtnClick(ophthalmologist){
        let specialties = this._formatSpecialties(this.specialties,ophthalmologist);

        this.setState({
            loading: true
        });

        const reverseGeocoder = new window.google.maps.Geocoder();
        reverseGeocoder.geocode({'location': {lat: ophthalmologist.lat, lng: ophthalmologist.lng}}, (response, status) => {

            if(status === 'OK'){
                if(response[0]){
                    const newSelectedOphthalmologist = {
                        ...ophthalmologist,
                        specialties: specialties,
                        formatted_address: response[0].formatted_address
                    };

                    this.selectedAddress = this._formatAddress(response[0].address_components, response[0].geometry.location);

                    this.setState({
                        selectedOphthalmologist: newSelectedOphthalmologist,
                        loading: false,
                    });
                } else {
                    alert("Désolé, l'adrsse n'est pas chargé merci de recharger vote page");
                }
            } else {
                alert("Désolé, quelque chose s'est mal passé");
            }
        });
    }

    _formatAddress(addressComponents, location){
        let address = defaultSelectedAddress;

        addressComponents.map((item) => {
            item.types.map((type) => {
                if (type.localeCompare('street_number') === 0)
                    address.adresse_line2 = item['long_name'];
                else if (type.localeCompare('route') === 0)
                    address.adresse_line2 = address.adresse_line2.concat(' '.concat(item['long_name']));
                else if (type.localeCompare('locality') === 0){
                    address.ville = item['long_name'];
                }
                else if (type.localeCompare('postal_code') === 0)
                    address.cp = parseInt(item['long_name']);
            });
        });

        address.lat = location.lat();
        address.lng = location.lng();

        return address;
    }

    _handlCloseModal(){
        this.setState({
            selectedOphthalmologist: defaultOphtho,
            errors: [],
            loading: false,
            message: ''
        });
        this.selectedAddress = undefined;
    }

    _renderItems(){
        return this.state.ophthalmologists.map(ophthalmologist => (
            <Item
                ophthalmologist = {ophthalmologist}
                onActionBtnClick = {this._handleActionBtnClick.bind(this,ophthalmologist)}
                key={ophthalmologist.id+5}
            />
        ));
    }

    _handleAddForm(e){
        e.preventDefault();

        this.setState({
            insertLoading: true,
            errors: []
        });

        const ophtho = {
            ...this.state.selectedOphthalmologist,
            ...this.selectedAddress,
        };

        const ophthoToSend = {
            ophthalmologist: {
                adresse_line1: ophtho.adresse_line1,
                adresse_line2: ophtho.adresse_line2,
                cp: ophtho.cp,
                email: ophtho.email,
                id: ophtho.id,
                lat: ophtho.lat,
                lng: ophtho.lng,
                nom: ophtho.nom,
                ville: ophtho.ville,
                tele: ophtho.tele,
                partenaire_acuvue: ophtho.partenaire_acuvue,
            },
            specialties: [
                ...ophtho.specialties.map(item => {
                    if(item.checked) return item.specialty;
                    return false;
                }).filter(item => item)
            ]
        };

        axio.post('api/ophthalmologists',ophthoToSend)
            .then(response => {
                this.selectedAddress = {
                    adresse_line2: '',
                    ville: '',
                    cp: undefined,
                    lat: undefined,
                    lng: undefined,
                };
                this.setState({
                    insertMessage: "L'ophthalmologiste a été ajouté",
                    ophthalmologists: response.data.ophthalmologists,
                    total: response.data.count,
                    insertLoading: false,
                    selectedOphthalmologist: defaultOphtho,
                });
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors,
                    insertLoading: false,
                });
            });
    }

    _handleEditForm(e){
         e.preventDefault();

         this.setState({
             loading: true,
             errors: []
         });

         const ophtho = {
             ...this.state.selectedOphthalmologist,
             ...this.selectedAddress,
         };

         const ophthoToSend = {
             ophthalmologist: {
                 adresse_line1: ophtho.adresse_line1,
                 adresse_line2: ophtho.adresse_line2,
                 cp: ophtho.cp,
                 email: ophtho.email,
                 id: ophtho.id,
                 lat: ophtho.lat,
                 lng: ophtho.lng,
                 nom: ophtho.nom,
                 ville: ophtho.ville,
                 tele: ophtho.tele,
                 partenaire_acuvue: ophtho.partenaire_acuvue,
             },
             specialties: [
                 ...ophtho.specialties.map(item => {
                     if(item.checked) return item.specialty;
                     return false;
                 }).filter(item => item)
             ]
         };

         axio.put('api/ophthalmologists/'+ophthoToSend.ophthalmologist.id,ophthoToSend)
             .then(response => {

                 const data = response.data[0];

                 const newOphto = {
                     adresse_line1: data.adresse_line1,
                     adresse_line2: data.adresse_line2,
                     cp: data.cp,
                     email: data.email,
                     id: data.id,
                     lat: data.lat,
                     lng: data.lng,
                     nom: data.nom,
                     ville: data.ville,
                     tele: data.tele,
                     partenaire_acuvue: !!data.partenaire_acuvue,
                     specialties: data.specialties,
                 };


                 let newListOphtho = this.state.ophthalmologists.map((ophtholmologist) => {
                     if (ophtholmologist.id !== newOphto.id)
                         return ophtholmologist;
                     return newOphto;
                 });

                 this.setState({
                     ophthalmologists: newListOphtho,
                     message: "L'ophthalmologiste a été bien modifié",
                     loading: false,
                 });
             })
             .catch(error => {
                 this.setState({
                     errors: error.response.data.errors,
                     loading: false,
                 });
             });
    }

    _hasErrorFor(field){
        return !!this.state.errors[field];
    }

    _renderErrorFor(field) {
        if (this._hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    _handleDeleteClick(e){
         e.preventDefault();
         const id = this.state.selectedOphthalmologist.id;

         this.setState({
             loadingList: true
         });

         axio.delete('api/ophthalmologists/'+id)
             .then((response) => {
                 this.setState({
                     globalMessage: "L'ophthalmologiste a été supprimé",
                     ophthalmologists: response.data.ophthalmologists,
                     total: response.data.count,
                     loadingList: false,
                 });
             })
             .catch((error) => console.log(error));
    }

    _handleDismissAlertClick(e){
        e.preventDefault();
        this.setState({
            message: '',
            insertMessage: ''
        });
    }

    // inputs change
    _handleCheckPartenaireACUVUEChange(value){
        this.setState({
            selectedOphthalmologist: {
                ...this.state.selectedOphthalmologist,
                partenaire_acuvue: !value,
            }
        });
    }

    _handleNomChange(event){
        this.setState({
            selectedOphthalmologist: {
                ...this.state.selectedOphthalmologist,
                nom: event.target.value,
            }
        }, () => console.log(this.state.selectedOphthalmologist));
    }

    _handleAdresseLine1Change(event){
        this.setState({
            selectedOphthalmologist: {
                ...this.state.selectedOphthalmologist,
                adresse_line1: event.target.value,
            }
        });
    }

    _handleEmailChange(event){
        this.setState({
            selectedOphthalmologist: {
                ...this.state.selectedOphthalmologist,
                email: event.target.value,
            }
        });
    }

    _handleTeleChange(event){
        this.setState({
            selectedOphthalmologist: {
                ...this.state.selectedOphthalmologist,
                tele: event.target.value,
            }
        });
    }

    _handleFormattedAddressChange(event){
                console.log("chenged formatted");
        this.selectedAddress = {
            adresse_line2: '',
            ville: '',
            cp: undefined,
            lat: undefined,
            lng: undefined,
        };
        this.setState({
            selectedOphthalmologist: {
                ...this.state.selectedOphthalmologist,
                formatted_address: event.target.value,
            }
        });
    }

    _handleCheckSpecialtiesChange(row){
        const specialties = this.state.selectedOphthalmologist.specialties.map(itemRow => {
            if (itemRow === row){
                return {
                    ...row,
                    checked: !row.checked,
                }
            }
            return itemRow;
        });

        this.setState({
            selectedOphthalmologist: {
                ...this.state.selectedOphthalmologist,
                specialties: specialties
            }
        });
    }

    render(){
        return (
            <div id="crud">
                <div className="container">
                    {this.state.globalMessage.length > 0 && <div className="alert alert-success">{this.state.globalMessage}</div>}
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Doctor <b>Locator</b></h2>
                                </div>
                                <div className="col-sm-6">
                                    <a href="#addEmployeeModal" onClick={this._handleAjoutBtnClick.bind(this)} className="btn actionBtn" data-toggle="modal"><i className="fas fa-plus-circle material-icons" /> <span>Ajouter</span></a>
                                    <a className="btn cancelBtn" onClick={this.props.onLogout}><i className="fas fa-sign-out-alt" /> <span>Se déconnecter</span></a>
                                </div>
                            </div>
                        </div>
                        <table style={{position: 'relative'}} className="table table-striped table-hover">
                            {this.state.loadingList && <LoadingLayer/>}
                            <thead>
                            <tr>
                                <th style={{minWidth: "200px"}}>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>

                            {this._renderItems()}

                            </tbody>
                        </table>
                        <div className="clearfix">
                            <div className="hint-text">Montrant <b>{this.state.ophthalmologists.length}</b> sur <b>{this.state.total}</b> entrées</div>
                            <ul className="pagination">
                                <li className="page-item disabled"><a href="#">Previous</a></li>
                                <li className="page-item"><a href="#" className="page-link">1</a></li>
                                <li className="page-item"><a href="#" className="page-link">2</a></li>
                                <li className="page-item active"><a href="#" className="page-link">3</a></li>
                                <li className="page-item"><a href="#" className="page-link">4</a></li>
                                <li className="page-item"><a href="#" className="page-link">5</a></li>
                                <li className="page-item"><a href="#" className="page-link">Next</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <AddItem
                    ophthalmologist={this.state.selectedOphthalmologist}
                    specialties={this.specialties}
                    activeSpecialties={this.state.selectedOphthalmologist.specialties}
                    onCloseModal={this._handlCloseModal.bind(this)}
                    onCheckSpecialtyChange={this._handleCheckSpecialtiesChange.bind(this)}
                    onCheckPartenaireACUVUEChange={this._handleCheckPartenaireACUVUEChange.bind(this)}
                    setSelectedAddress={this.setSelectedAddress.bind(this)}
                    onNomChange={this._handleNomChange.bind(this)}
                    onAdresseLine1Change={this._handleAdresseLine1Change.bind(this)}
                    onEmailChange={this._handleEmailChange.bind(this)}
                    onTeleChange={this._handleTeleChange.bind(this)}
                    onFormattedAddressChange={this._handleFormattedAddressChange.bind(this)}
                    formatAddress={this._formatAddress}
                    onAddForm={this._handleAddForm.bind(this)}
                    errors={this.state.errors}
                    hasErrorFor={this._hasErrorFor.bind(this)}
                    renderErrorFor={this._renderErrorFor.bind(this)}
                    loading={this.state.insertLoading}
                    message={this.state.insertMessage}
                    onAlertDismiss={this._handleDismissAlertClick.bind(this)}
                />

                <EditItem
                    ophthalmologist={this.state.selectedOphthalmologist}
                    specialties={this.specialties}
                    activeSpecialties={this.state.selectedOphthalmologist.specialties}
                    onCloseModal={this._handlCloseModal.bind(this)}
                    onCheckSpecialtyChange={this._handleCheckSpecialtiesChange.bind(this)}
                    onCheckPartenaireACUVUEChange={this._handleCheckPartenaireACUVUEChange.bind(this)}
                    setSelectedAddress={this.setSelectedAddress.bind(this)}
                    onNomChange={this._handleNomChange.bind(this)}
                    onAdresseLine1Change={this._handleAdresseLine1Change.bind(this)}
                    onEmailChange={this._handleEmailChange.bind(this)}
                    onTeleChange={this._handleTeleChange.bind(this)}
                    onFormattedAddressChange={this._handleFormattedAddressChange.bind(this)}
                    formatAddress={this._formatAddress}
                    onEditForm={this._handleEditForm.bind(this)}
                    errors={this.state.errors}
                    hasErrorFor={this._hasErrorFor.bind(this)}
                    renderErrorFor={this._renderErrorFor.bind(this)}
                    loading={this.state.loading}
                    message={this.state.message}
                    onAlertDismiss={this._handleDismissAlertClick.bind(this)}
                />

                <DeleteItem
                    ophthalmologist={this.state.selectedOphthalmologist}
                    onDeleteClick={this._handleDeleteClick.bind(this)}
                />
            </div>
        );
    }

}