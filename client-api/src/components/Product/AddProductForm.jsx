import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import { isValidField, isValidForm } from './Validation/RulesForm.jsx';
import { getMessageErrorFromField, getMessageErrorFromForm} from './Utils/ConfigMessages.jsx';

class AddProductForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fields : {
                title: '',
                price: '',
                percentageDiscount: '',
                category: '',
                photos: '',
            },
            validationErrors: []
        };

        this.onChangeField = this.onChangeField.bind(this);        
        this.onSave = this.onSave.bind(this);
    }

    onChangeField(event) {
        const field = event.target.name;
        const value = event.target.value.trim();       

        isValidField(field, value) ? this.removeValidationError(getMessageErrorFromField(field)) : this.addValidationError(getMessageErrorFromField(field));

        this.state.fields[field] = value;
    }

    onSave(event) {
        event.preventDefault();

        if (this.state.validationErrors && this.state.validationErrors.length === 0) {
            isValidForm(this.state.fields) ? this.props.onSaveProduct(this.state.fields) : this.addValidationError(getMessageErrorFromForm('products'));
        }
    }
    
    addValidationError(message) {        
        this.setState((previousState) => {
            const validationErrors = [...previousState.validationErrors];
            validationErrors.push({message});
            return {
                validationErrors: validationErrors
            };
        });      
    }

    
    removeValidationError(message) {
        this.setState((previousState) => {
            const validationErrors = previousState
                .validationErrors
                .filter(error => error.message !== message);
            
            return {
                validationErrors: validationErrors
            };
        });      
    }

    
    render() {

        const validationErrorSummary = this.state.validationErrors.map(error => 
            <div key={uuidv1()} className="alert alert-danger alert-dismissible fade show">
                {error.message}
                <button type="button" className="close" data-dismiss="alert">
                    <span>&times;</span>
                </button>
            </div>
        );

        return (
            <div className="card card-body">
                <div className="mb-2">        
                    <span className="h4 my-auto"><i className="fa fa-file-text-o fa-lg"></i> New Product</span>
                    <a className="float-right ml-auto" onClick={this.props.onCloseModal}>
                        <i className="fa fa-remove fa-2x mr-2 text-danger"></i>
                    </a>
                </div>
                {validationErrorSummary}
                <form onSubmit={this.onSave} className="mt-2">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" name="title" autoFocus onChange={this.onChangeField} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" className="form-control"  min="0" name="price" autoFocus onChange={this.onChangeField} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="percentageDiscount">Percentage Discount</label>
                        <input type="number" className="form-control" min="0" max="100" name="percentageDiscount" autoFocus onChange={this.onChangeField} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input type="text" className="form-control" name="category" autoFocus onChange={this.onChangeField} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="photos">Photos</label>
                        <input type="text" className="form-control" name="photos" autoFocus onChange={this.onChangeField} />
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-4 col-md-3 col-xl-2 ml-auto">
                            <button type="submit" className="btn btn-success btn-lg btn-block">
                                <i className="fa fa-save mr-2"></i>Save
                            </button>
                        </div>
                        <div className="col-sm-4 col-md-3 col-xl-2">
                            <button className="btn btn-danger btn-lg btn-block mt-2 mt-sm-0"
                                onClick={this.props.onCloseModal}
                                type="button">
                                <i className="fa fa-remove mr-2"></i>Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

AddProductForm.propTypes = {
    onCloseModal: PropTypes.func,
    onSaveProduct: PropTypes.func
};

export default AddProductForm;