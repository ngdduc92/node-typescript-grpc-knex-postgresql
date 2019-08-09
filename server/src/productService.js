const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');
const path = require('path');

const getProductService = () => {
    const demoProtoPath = path.join(__dirname, '..', '..', 'protos', 'demo.proto');
    const demoProtoDefinition = protoLoader.loadSync(demoProtoPath);
    const demoPackageDefinition = grpc.loadPackageDefinition(demoProtoDefinition).demo;
    return demoPackageDefinition.ProductService.service;
}
const productService = getProductService();

module.exports = productService;