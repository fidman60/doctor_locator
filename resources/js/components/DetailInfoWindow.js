import React from 'react';
import '../styles/infoWindow.css';

export default function DetailInfoWindow (props) {

    return (
        <div id="infoBlock">
            <div>
                <span className="font-weight-bold">Nom: </span>{props.ophto.nom}
            </div>
            <div>
                <span className="font-weight-bold">Adresse line 1:</span>  {props.ophto.adresse_line1}
            </div>
            <div>
                <span className="font-weight-bold">Adresse line 2:</span>  {props.ophto.adresse_line2}
            </div>
            <div>
                <span className="font-weight-bold">Ville:</span>  {props.ophto.ville}
            </div>
            <div>
                <span className="font-weight-bold">Code postal:</span>  {props.ophto.cp}
            </div>
            <div>
                <span className="font-weight-bold">Téléphone:</span>  {props.ophto.tele}
            </div>
            <div>
                <span className="font-weight-bold">Email:</span>  {props.ophto.email}
            </div>
        </div>
    );

}