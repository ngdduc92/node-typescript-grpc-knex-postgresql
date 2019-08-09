const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');
const path = require('path');

const getGRPCClient = () => {
    const demoProtoPath = path.join(__dirname, '..', '..', 'protos', 'demo.proto');
    const demoProtoDefinition = protoLoader.loadSync(demoProtoPath);
    const demoPackageDefinition = grpc.loadPackageDefinition(demoProtoDefinition).demo;
    const gRPCClient = new demoPackageDefinition.ProductService(
        'localhost:50051', grpc.credentials.createInsecure());
    return gRPCClient;
}
const gRPCClient = getGRPCClient();

module.exports = gRPCClient;