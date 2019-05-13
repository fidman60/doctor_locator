import React from 'react';

export default function Alert(props) {
    return (
        <div className="container">
            <div style={{marginTop: '20px'}} className="row">
                <div className="col-12">
                    <div className="alert alert-primary" role="alert">
                        {props.msg}
                    </div>
                </div>
            </div>
        </div>
    );
}