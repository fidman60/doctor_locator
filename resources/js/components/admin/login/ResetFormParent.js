import React from 'react';
import queryString from 'query-string';
import axio from 'axios';
import ResetForm from "./ResetForm";

export default class ResetFormParent extends React.Component {

    constructor(props){
        super(props);

        this.params = queryString.parse(this.props.location.search);

        this.state = {
            found: false,
            loading: true,
        };
    }

    componentWillMount() {

        if (this.params.token.length > 0) {
            axio.get("api/password/find/"+this.params.token)
                .then((response) => {
                    this.setState({
                        found: true,
                        loading: false,
                    });
                })
                .catch((error) => {
                    this.setState({
                        loading: false,
                    });
                });
        }
    }

    render() {
        return this.state.loading ? <div>Loading...</div> : this.state.found ? <ResetForm token={this.params.token} /> : <div>Invalid token</div>
    }

}