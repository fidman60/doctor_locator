import React, {Component} from 'react';
import '../../styles/msgAlert.css';

export default class MsgAlert extends Component {

    render() {
        const show = this.props.render ? 'block' : 'none';
        return (
            <div style={{display: show, marginTop: this.props.global ? '30px' : 'auto'}} ref="dd" id="msgAlert" className={`alert ${this.props.error ? 'error': 'info'} actionAlert`}>
                <span className="closebtn" onClick={this.props.onAlertDismiss}>&times;</span>
                <strong>{this.props.message}</strong>
            </div>
        );
    }

}