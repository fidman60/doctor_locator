import React,{Component} from 'react';

export default class Item extends Component {

    render(){

        const {ophthalmologist,onActionBtnClick} = this.props;

        return (
            <tr>
                <td>{ophthalmologist.nom}</td>
                <td>{ophthalmologist.email}</td>
                <td>{ophthalmologist.adresse_line2}, {ophthalmologist.ville}, FR</td>
                <td>{ophthalmologist.tele}</td>
                <td>
                    <a href="#editEmployeeModal" className="edit" data-toggle="modal" onClick={onActionBtnClick}><i className="fas fa-pen" data-toggle="tooltip" title="Editer" /></a>
                    <a href="#deleteEmployeeModal" className="delete" data-toggle="modal" onClick={onActionBtnClick}><i data-toggle="tooltip" title="Delete" className="fas fa-trash" /></a>
                </td>
            </tr>
        );
    }

}