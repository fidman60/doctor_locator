import React, {Component} from 'react';
import {connect} from "react-redux";
import '../../styles/errorAlert.css';

class ErrorAlert extends Component {

    _render(){
        this.refs.err.style.display = "block";

        setTimeout(() => this.refs.err.style.display = "none", 3000 );
    }

    render() {
        return (
            <div ref="err" id="err">
                <p>{this.props.message}</p>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    message: state.message,
});

export default connect(mapStateToProps)(ErrorAlert);