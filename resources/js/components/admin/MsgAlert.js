import React, {Component} from 'react';
import '../../styles/msgAlert.css';

export default class MsgAlert extends Component {

    render() {
        const show = this.props.render ? 'block':'none';
        return (
            <div style={{display: show}} ref="dd" id="msgAlert" className="alert info actionAlert">
                <span className="closebtn" onClick={this.props.onAlertDismiss}>&times;</span>
                <strong>Info!</strong> {this.props.message}
            </div>
        );
    }

}