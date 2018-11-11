
const chai = require('chai');
const {expect} = chai;
const isValidProduct = require('../../api/validations/product');

describe('Validation Functions', () => {
    describe('isValidProduct', () => {
        it('call isValidProduct function with unknow action', () => {  
            let callFunction = isValidProduct('{}','xpto')
            expect(callFunction.status).to.be.equals('error');
            expect(callFunction.error).to.be.equals('nothing to do without action xpto');
        });
    }); 
});
