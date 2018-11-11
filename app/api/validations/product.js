var Validator = require('jsonschema').Validator;
var schemaValidate = new Validator();

const jsonAdd = require('./schemas/add_product_json_schema.js')();
const jsonUpdate = require('./schemas/update_product_json_schema.js')();

function validatePhoto(objectProduct){
    let photos = objectProduct.photos
    try {
        if (photos.length !== 4) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }
}

function validateSchemaAdd(objectProduct){
    
    let schemaValidation = schemaValidate.validate(objectProduct, jsonAdd);
    
    if (schemaValidation.valid){
        if (validatePhoto(objectProduct)){
            return {status:'success'};
        }else{
            console.log(`invalid photo Object`);
            return {
                status: 'error',
                error: JSON.stringify({'photo_object':'photos object is not valid'})
            };
        }
    }else{
        console.log(`invalid schema ${JSON.stringify(schemaValidation.errors)}`);
        return {
            status: 'error',
            error: JSON.stringify(schemaValidation.errors)
        };
    }
}

function validateSchemaUpdate(objectProduct){

    let schemaValidation = schemaValidate.validate(objectProduct, jsonUpdate);
    
    if (schemaValidation.valid){
        if (validatePhoto(objectProduct)){
            return {status:'success'};
        }else{
            console.log(`invalid photo Object`);
            return {
                status: 'error',
                error: JSON.stringify({'photo_object':'photos object is not valid'})
            };
        }
    }else{
        console.log(`invalid schema ${JSON.stringify(schemaValidation.errors)}`);
        return {
            status: 'error',
            error: JSON.stringify(schemaValidation.errors)
        };
    }
}

function isValidProduct(fieldsValues, action) {
    
    let objValidation = '';

    if (action == 'add'){
        objValidation = validateSchemaAdd(fieldsValues);
        if (objValidation.status === 'error'){
            console.log(`invalid schema ${JSON.stringify(objValidation.error)}`);
            return objValidation;
        }else {
            return {status:'success'};
        }
    }else{
        if (action == 'update'){
            objValidation = validateSchemaUpdate(fieldsValues);
            if (objValidation.status === 'error'){
                console.log(`invalid schema ${JSON.stringify(objValidation.error)}`);
                return objValidation;
            }else {
                return {status:'success'};
            }
        }else{
            console.log(`nothing to do without action ${action}`);
            return {
                status: 'error',
                error: `nothing to do without action ${action}`
            };
        }
    }
}

module.exports = isValidProduct;
