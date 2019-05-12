import React, {Component} from 'react';
import {v4} from 'uuid';

export default class OphthalmologistItem extends Component {

    _renderSpecialties(specialties){
        return specialties.map(specialty => <p key={v4()}>{specialty.label}</p> );
    }

    _renderItem(ophthalmologist, index){
        const iconClass = this.props.favorites.findIndex(id => id === ophthalmologist.id) > -1 ? "fas" : "far";
        return (
            <tr>
                <th style={{position: 'relative', textAlign: 'center', minWidth: '100px'}} scope="row">
                    <span className="orderNbr">{index+1}</span>
                </th>
                <td>
                    <p>{ophthalmologist.adresse_line1}</p>
                    <p>{`${ophthalmologist.adresse_line2}, ${ophthalmologist.ville}, ${ophthalmologist.cp}`}</p>
                </td>
                <td>
                    {this._renderSpecialties(ophthalmologist.specialties)}
                </td>
                <td>
                    <p>{ophthalmologist.tele}</p>
                    <p>{ophthalmologist.email}</p>
                </td>
                <td style={{position: 'relative', minWidth: '100px'}} className="text-center" scope="row">
                    <a
                        href="#"
                        onClick={this.props.onClick}
                    >
                        <i className={ iconClass + " fa-heart tab-icon imgFavorite"} />
                    </a>
                </td>
            </tr>
        );
    }

    render() {

        const {ophthalmologist, index} = this.props;
        return this._renderItem(ophthalmologist,index);
    }

}