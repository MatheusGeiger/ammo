const chai = require('chai');
const {expect} = chai;
const sinon = require('sinon');
const _ = require('lodash');
const proxyQuire = require('proxyquire');
const sandbox = sinon.createSandbox();
const statusStub = sandbox.stub();
const jsonStub = sandbox.stub();
const saveStub = sandbox.stub();
const findStub = sandbox.stub();
const findOneStub = sandbox.stub();
const updateStub = sandbox.stub();
const deleteStub = sandbox.stub();
const removeStub = sandbox.stub();
const thenStub = sandbox.stub();
const execStub = sandbox.stub();
const sortStub = sandbox.stub();

const ProductController = proxyQuire('../../api/controllers/product', {
    '../models/product': function() {
        this.find = findStub;
        this.findOne = findOneStub;
        this.save = saveStub;
        this.update = updateStub;
        this.delete = deleteStub;
    }
});


describe('Product', () => {
    afterEach(() => sandbox.reset());
    describe('create', () => {
        it('should return status 201, \
        message Product created and result object', async () => {
            
            statusStub.returns({json: jsonStub});
            saveStub.resolves('result');

            let req = {
                body: {
                    title: 'title',
                    category: 'Classic',
                    photos : [{"id":1,"url":"http://fake-url.com"},
                    {"id":2,"url":"http://fake-url.com"}],
                    price: 298,
                    percentageDiscount: 20
                }
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await ProductController.create(req, res, next);

            expect(statusStub.calledWith(201)).to.equal(true);
            expect(statusStub.callCount).to.be.equal(1);

            expect(jsonStub.calledWith({ 
                message: 'Product created',
                result: 'result' })).to.equal(true);
            expect(jsonStub.callCount).to.be.equal(1);
        });

        it('should return status 500 and error message', async () => {
            
            statusStub.returns({json: jsonStub});
            saveStub.returns({then: thenStub});
            thenStub.rejects(new Error('error'));

            let req = {
                body: {
                    title: 'title',
                    category: 'Classic',
                    photos : [{"id":1,"url":"http://fake-url.com"},
                    {"id":2,"url":"http://fake-url.com"}],
                    price: 298,
                    percentageDiscount: 20
                }
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await ProductController.create(req, res, next);

            expect(statusStub.calledWith(500)).to.equal(true);
            expect(jsonStub.calledWith(sinon.match(a => { 
                return _.isEqual(a, {error: new Error('error')});
            }))).to.equal(true);
        });

        it('should return status 400 and error message', async () => {

            statusStub.returns({json: jsonStub});

            let req = {
                body: {
                    title: 'title',
                    category: '',
                    photos : [{"id":1,"url":"http://fake-url.com"},
                    {"id":2,"url":"http://fake-url.com"}],
                    price: 298,
                    percentageDiscount: 20
                }
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await ProductController.create(req, res, next);

            expect(statusStub.calledWith(400)).to.equal(true);
            expect(jsonStub.returned()).to.equal(true);
        });
    }); 

    describe('findProducts', () => {

        const ProductController = proxyQuire('../../api/controllers/product', {
            '../models/product': {
                find: findStub,
                findOne: findOneStub
            }
        });

        it('should return status 200 and result object', async () => {
            
            statusStub.returns({json: jsonStub});
            findStub.returns({exec: execStub});
            execStub.resolves('products');

            let req = {
                query : {}
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await ProductController.findProducts(req, res, next);

            expect(statusStub.calledWith(200)).to.equals(true);
            expect(jsonStub.calledWith('products')).to.equals(true);
        });
        

        it('should return status 200 with title and result object', async () => {
            
            statusStub.returns({json: jsonStub});
            findStub.returns({sort: sortStub});            
            sortStub.returns({exec: execStub});
            execStub.returns({then: thenStub});
            execStub.resolves('products');

            let req = {
                query : {
                    title: 'title'
                }
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await ProductController.findProducts(req, res, next);

            expect(sortStub.callCount).to.be.equal(1);            
            expect(statusStub.calledWith(200)).to.equals(true);
            expect(jsonStub.calledWith('products')).to.equals(true);
        });

        it('should return status 200 with id and result object', async () => {
            
            statusStub.returns({json: jsonStub});
            findOneStub.returns({exec: execStub});
            execStub.returns({then: thenStub});
            execStub.resolves('products');

            let req = {
                params: 'id'
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await ProductController.findProductById(req, res, next);

            expect(findOneStub.callCount).to.be.equal(1);            
            expect(statusStub.calledWith(200)).to.equals(true);
            expect(jsonStub.calledWith('products')).to.equals(true);
        });

        it('should return status 500 with id and error message', async () => {
            
            statusStub.returns({json: jsonStub});
            findOneStub.returns({exec: execStub});
            execStub.returns({then: thenStub});
            thenStub.rejects(new Error('error'));

            let req = {
                params: 'id'
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await ProductController.findProductById(req, res, next);

            expect(findOneStub.callCount).to.be.equal(1);
            expect(statusStub.calledWith(500)).to.be.equal(true);
            expect(jsonStub.calledWith(sinon.match(a => { 
                return _.isEqual(a, {error: new Error('error')});
            }))).to.equal(true);
        });

        it('should return status 500 and error message', async () => {
            
            statusStub.returns({json: jsonStub});
            findStub.returns({exec: execStub});
            execStub.returns({then: thenStub});
            thenStub.rejects(new Error('error'));

            let req = {
                query:{},
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await ProductController.findProducts(req, res, next);

            expect(statusStub.calledWith(500)).to.be.equal(true);
            expect(jsonStub.calledWith(sinon.match(a => { 
                return _.isEqual(a, {error: new Error('error')});
            }))).to.equal(true);
        });

        it('should return status 500 with title and error message', async () => {
            
            statusStub.returns({json: jsonStub});
            findStub.returns({sort: sortStub});            
            sortStub.returns({exec: execStub});
            execStub.returns({then: thenStub});
            thenStub.rejects(new Error('error'));

            let req = {
                query:{
                    title: 'title'
                },
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await ProductController.findProducts(req, res, next);

            expect(sortStub.callCount).to.be.equal(1);
            expect(statusStub.calledWith(500)).to.be.equal(true);
            expect(jsonStub.calledWith(sinon.match(a => { 
                return _.isEqual(a, {error: new Error('error')});
            }))).to.equal(true);
        });
    }); 
    describe('update', () => {

        const ProductController = proxyQuire('../../api/controllers/product', {
            '../models/product': {
                update: updateStub
            }
        });

        it('should return status 200 and result object', async () => {
            
            statusStub.returns({json: jsonStub});
            updateStub.resolves();

            let req = {
                body: {
                    _id: 'dsa4c',
                    title: 'title modified',
                    category: 'category modified',
                    photos : [{"id":1,"url":"http://fake-url.com"},
                    {"id":2,"url":"http://fake-url.com"}],
                    price: 298,
                    percentageDiscount: 20
                },
                params: {
                    id: 'id'
                }
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await ProductController.update(req, res, next);

            expect(statusStub.calledWith(202)).to.be.equal(true);
            expect(jsonStub.calledWith({ message: 'Updated' })).to.equal(true);
        });

        it('should return status 500 and error message', async () => {
            
            statusStub.returns({json: jsonStub});
            updateStub.returns({then: thenStub});
            thenStub.rejects(new Error('error'));

            let req = {
                body: {
                    _id: 'dsa4c',
                    title: 'title modified',
                    category: 'category modified',
                    photos : [{"id":1,"url":"http://fake-url.com"},
                    {"id":2,"url":"http://fake-url.com"}],
                    price: 298,
                    percentageDiscount: 20
                },
                params: {
                    id: 'id'
                }
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await ProductController.update(req, res, next);

            expect(statusStub.calledWith(500)).to.be.equal(true);
            expect(jsonStub.calledWith(sinon.match(a => { 
                return _.isEqual(a, {error: new Error('error')});
            }))).to.equal(true);
        });

        it('should return status 400 and error message', async () => {

            statusStub.returns({json: jsonStub});

            let req = {
                body: {
                    _id: 'dsa4c',
                    title: 'title',
                    category: '',
                    photos : [{"id":1,"url":"http://fake-url.com"},
                    {"id":2,"url":"http://fake-url.com"}],
                    price: 298,
                    percentageDiscount: 20
                }
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await ProductController.update(req, res, next);

            expect(statusStub.calledWith(400)).to.equal(true);
            expect(jsonStub.returned()).to.equal(true);
        });
    });

    describe('delete', () => {

        const ProductController = proxyQuire('../../api/controllers/product', {
            '../models/product': {
                delete: deleteStub,
                find: findStub,
                remove: removeStub,
                exec: execStub,
                then: thenStub
            }
        });

        it('should return status 202 and result object', async () => {
            
            statusStub.returns({json: jsonStub});
            findStub.returns({remove: removeStub});
            removeStub.returns({exec: execStub});
            execStub.resolves('success');

            let req = {
                params: {
                    id: 'id'
                }
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await ProductController.delete(req, res, next);

            expect(statusStub.calledWith(202)).to.be.equal(true);
            expect(removeStub.callCount).to.be.equal(1);
            expect(jsonStub.calledWith({ message: 'Deleted' })).to.equal(true);
        });

        it('should return status 500 and error message', async () => {
            
            statusStub.returns({json: jsonStub});
            findStub.returns({remove: removeStub}); 
            removeStub.returns({exec: execStub});
            execStub.returns({then: thenStub});
            thenStub.rejects(new Error('error'));

            let req = {
                params: {
                    id: 'id'
                }
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await ProductController.delete(req, res, next);

            expect(statusStub.calledWith(500)).to.be.equal(true);
            expect(removeStub.callCount).to.be.equal(1);
            expect(jsonStub.calledWith(sinon.match(a => { 
                return _.isEqual(a, {error: new Error('error')});
            }))).to.equal(true);
        });
    }); 
});
