import React from 'react';
import axio from 'axios';
import '../../styles/crud.css';
import Item from "./Item";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";
import LoadingLayer from "./LoadingLayer";
import Pagination from "react-js-pagination";
import MsgAlert from "./MsgAlert";
import Typeahead from "react-bootstrap-typeahead/es/components/AsyncTypeahead.react";

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
            currentPage: 1,
            total: 0,
            selectedOphthalmologist: defaultOphtho,
            errors: [],
            loading: false,
            message: '',
            globalMessage: '',
            loadingList: false,
            insertLoading: false,
            insertMessage: '',
            opthalsFoundNames: [],
            loadingOphthalsNames: false,
        };

        this.specialties = [];
        this.selectedAddress = defaultSelectedAddress;
        this.perPage = 0;

        this.selectedOphtalId = 0;
    }

    componentWillMount() {
        axio.get(`api/paginate/ophthalmologists?page=${this.state.currentPage}`)
            .then(response => {
                this.perPage = response.data.per_page;
                this.setState({
                    ophthalmologists: response.data.data,
                    total: response.data.total,
                    currentPage: response.data.current_page
                });
            })
            .catch(error => console.log(error));

        axio.get("api/specialities")
            .then(response => this.specialties = response.data)
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
                ...defaultOphtho,
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
                    alert("Désolé, l'adrsse n'est pas chargé merci de recharger vote currentPage");
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
                    ophthalmologists: response.data.data,
                    total: response.data.total,
                    insertLoading: false,
                    selectedOphthalmologist: defaultOphtho,
                    currentPage: response.data.current_page
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
                     ophthalmologists: response.data.data,
                     total: response.data.total,
                     loadingList: false,
                     selectedOphthalmologist: defaultOphtho,
                     currentPage: response.data.current_page
                 });
             })
             .catch((error) => {
                 console.log(error);
                 this.setState({
                     loadingList: false,
                 });
             });
    }

    _handleDismissAlertClick(e){
        e.preventDefault();
        this.setState({
            message: '',
            insertMessage: '',
            globalMessage: '',
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

    _handleFormattedAddressChangeForAddingIssue(value){
        this.setState({
            selectedOphthalmologist: {
                ...this.state.selectedOphthalmologist,
                formatted_address: value,
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

    _handlePageChange(pageNumber){

        this.setState({
            loadingList: true,
        });

        axio.get(`api/paginate/ophthalmologists?page=${pageNumber}`)
            .then(response => {
                this.perPage = response.data.per_page;
                this.setState({
                    ophthalmologists: response.data.data,
                    total: response.data.total,
                    currentPage: response.data.current_page,
                    loadingList: false,
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    loadingList: false,
                })
            });

        this.setState({currentPage: pageNumber});
    }

    _getOphthosNom(){

    }

    _handleSearchOpthalsNom(value){
        this.setState({
            loadingOphthalsNames: true,
        });

        axio.post('api/search/ophthalmologists',{
            'searchQuery': value,
        })
            .then((response) => {
                this.setState({
                    loadingOphthalsNames: false,
                    opthalsFoundNames: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    loadingOphthalsNames: false,
                });
            });
    }

    _handleSelectOphthalNom(arr){
        if (arr.length > 0)
            this.selectedOphtalId = arr[0].id;
    }

    _handleSubmitSearchOphthalForm(e){
        e.preventDefault();

        this.setState({
            loadingList: true,
        });

        axio.get('api/ophthalmologists/'+this.selectedOphtalId)
            .then((response) => {
                this.setState({
                    ophthalmologists: response.data,
                    loadingList: false,
                    currentPage: 1,
                    total: response.data.length,
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    loadingList: false,
                })
            });
    }
    render(){
        return (
            <div id="crud">
                <div className="container">
                    <MsgAlert
                        onAlertDismiss={this._handleDismissAlertClick.bind(this)}
                        message={this.state.globalMessage}
                        render={this.state.globalMessage.length > 0}
                        global={true}
                    />

                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Doctor <b>Locator</b></h2>
                                </div>
                                <div className="col-sm-6">
                                    <a href="#addEmployeeModal" onClick={this._handleAjoutBtnClick.bind(this)} className="btn actionBtn" data-toggle="modal"><i style={{marginRight: '0px',float: 'none'}} className="fas fa-plus-circle material-icons" /></a>
                                    <a data-toggle="collapse" data-target="#dd" aria-controls="dd" aria-expanded="false" aria-label="Toggle" className="btn actionBtn"><i style={{marginRight: '0px',float: 'none'}} className="fas fa-search" /></a>
                                    <a className="btn cancelBtn" onClick={this.props.onLogout}><i className="fas fa-sign-out-alt" /> <span>Se déconnecter</span></a>
                                </div>
                            </div>
                        </div>

                        <div id="dd" className="collapse navbar-collapse" style={{position: 'relative', zIndex: 999}}>
                            <form onSubmit={this._handleSubmitSearchOphthalForm.bind(this)}>
                                <div className="search-toggle" style={{background: 'white', overflow: 'visible'}}>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12 form-inline justify-content-center" >
                                                <label style={{marginRight: '20px'}} >Nom ophthalmologist: </label>
                                                <Typeahead
                                                    onChange={this._handleSelectOphthalNom.bind(this)}
                                                    onSearch={this._handleSearchOpthalsNom.bind(this)}
                                                    options={this.state.opthalsFoundNames}
                                                    labelKey="nom"
                                                    id="1"
                                                    isLoading={this.state.loadingOphthalsNames}
                                                />
                                                <button className="search-btn"><i className="fa fa-search search-div" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div style={{position: 'relative'}}>
                            {this.state.loadingList && <LoadingLayer/>}
                            <table className="table table-striped table-hover">
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
                        </div>
                        <div className="clearfix">
                            <div className="hint-text">Montrant <b>{this.state.ophthalmologists.length}</b> sur <b>{this.state.total}</b> entrées</div>
                            <Pagination
                                activePage={this.state.currentPage}
                                itemsCountPerPage={this.perPage}
                                totalItemsCount={this.state.total}
                                pageRangeDisplayed={5}
                                onChange={this._handlePageChange.bind(this)}
                                className="pagination"
                                firstPageText=""
                                lastPageText=""
                                itemClass="pageItem"
                            />
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
                    onFormattedAddressChangeForAddingIssue={this._handleFormattedAddressChangeForAddingIssue.bind(this)}
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