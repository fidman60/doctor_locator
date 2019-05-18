import React, {Component} from 'react';

export default class DeleteItem extends Component {

    render() {
        return (
            <div id="deleteEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h4 className="modal-title">Delete Employee</h4>
                                <button type="button" className="close" data-dismiss="modal"
                                        aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">
                                <p>Vous êtes sûr de supprimer l'ophthalmologiste avec le nom {this.props.ophthalmologist.nom} ?</p>
                            </div>
                            <div className="modal-footer">
                                <input type="button" className="btn cancelBtn" data-dismiss="modal"
                                       value="Cancel" />
                                <input data-dismiss="modal" type="submit" className="btn btn-danger" value="Delete" onClick={this.props.onDeleteClick} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}