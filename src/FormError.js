import React, {Component} from 'react';

class FormError extends Component {
    render () {
        const { theMessage } = this.props;
    

    return (
        <div className="Error">
        {theMessage}
        </div>
    );
    }
}

export default FormError;