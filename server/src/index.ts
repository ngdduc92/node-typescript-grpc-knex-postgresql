import grpc from 'grpc';
import productService from './productService';

// knex
const environment = process.env.ENVIRONMENT || 'development';
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config);

const productTableName = 'products_test';
// knex queries
const listProducts = (call: any, callback: Function) => {
  /*
  Using 'grpc.load'? Send back an array: 'callback(null, { data });'
  */
  knex(productTableName)
    .then((data: any) => { callback(null, { products: data }); });
}
const readProduct = (call: any, callback: Function) => {
  knex(productTableName)
    .where({ id: parseInt(call.request.id) })
    .then((data: any) => {
      if (data.length) {
        callback(null, data[0]);
      } else {
        callback('That product does not exist');
      }
    });
}
const createProduct = (call: any, callback: Function) => {
  knex(productTableName)
    .insert({
      name: call.request.name,
      price: call.request.price,
    })
    .then(() => { callback(null, { status: 'success' }); });
}
const updateProduct = (call: any, callback: Function) => {
  knex(productTableName)
    .where({ id: parseInt(call.request.id) })
    .update({
      name: call.request.name,
      price: call.request.price,
    })
    .returning()
    .then((data: any) => {
      if (data) {
        callback(null, { status: 'success' });
      } else {
        callback('That product does not exist');
      }
    });
}
const deleteProduct = (call: any, callback: Function) => {
  knex(productTableName)
    .where({ id: parseInt(call.request.id) })
    .delete()
    .returning()
    .then((data: any) => {
      if (data) {
        callback(null, { status: 'success' });
      } else {
        callback('That product does not exist');
      }
    });
}

// main
const main = () => {
  const server = new grpc.Server();
  // gRPC service
  server.addService(productService, {
    listProducts: listProducts,
    readProduct: readProduct,
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
  });
  // gRPC server
  server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('gRPC server running at http://localhost:50051');
}

main();
