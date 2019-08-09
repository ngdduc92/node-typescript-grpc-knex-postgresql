"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_1 = __importDefault(require("grpc"));
const productService_1 = __importDefault(require("./productService"));
// knex
const environment = process.env.ENVIRONMENT || 'development';
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config);
const productTableName = 'products_test';
// knex queries
const listProducts = (call, callback) => {
    /*
    Using 'grpc.load'? Send back an array: 'callback(null, { data });'
    */
    knex(productTableName)
        .then((data) => { callback(null, { products: data }); });
};
const readProduct = (call, callback) => {
    knex(productTableName)
        .where({ id: parseInt(call.request.id) })
        .then((data) => {
        if (data.length) {
            callback(null, data[0]);
        }
        else {
            callback('That product does not exist');
        }
    });
};
const createProduct = (call, callback) => {
    knex(productTableName)
        .insert({
        name: call.request.name,
        price: call.request.price,
    })
        .then(() => { callback(null, { status: 'success' }); });
};
const updateProduct = (call, callback) => {
    knex(productTableName)
        .where({ id: parseInt(call.request.id) })
        .update({
        name: call.request.name,
        price: call.request.price,
    })
        .returning()
        .then((data) => {
        if (data) {
            callback(null, { status: 'success' });
        }
        else {
            callback('That product does not exist');
        }
    });
};
const deleteProduct = (call, callback) => {
    knex(productTableName)
        .where({ id: parseInt(call.request.id) })
        .delete()
        .returning()
        .then((data) => {
        if (data) {
            callback(null, { status: 'success' });
        }
        else {
            callback('That product does not exist');
        }
    });
};
// main
const main = () => {
    const server = new grpc_1.default.Server();
    // gRPC service
    server.addService(productService_1.default, {
        listProducts: listProducts,
        readProduct: readProduct,
        createProduct: createProduct,
        updateProduct: updateProduct,
        deleteProduct: deleteProduct,
    });
    // gRPC server
    server.bind('localhost:50051', grpc_1.default.ServerCredentials.createInsecure());
    server.start();
    console.log('gRPC server running at http://localhost:50051');
};
main();
