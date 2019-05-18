import React from 'react';
import '../../styles/loadingLayer.css';

export default function LoadingLayer (props) {
    return (
        <div id="charging">
            <div id="iconLayer" className="fa-3x">
                <i className="fas fa-circle-notch fa-spin" />
            </div>
        </div>
    );
}