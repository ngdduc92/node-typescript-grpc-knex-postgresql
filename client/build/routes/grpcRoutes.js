"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gRPCClient_1 = __importDefault(require("../gRPCClient"));
// handlers
const listProducts = (req, res) => {
    /*
    gRPC method for reference:
    listProducts(Empty) returns (ProductList)
    */
    gRPCClient_1.default.listProducts({}, (err, result) => {
        res.json(result);
    });
};
const readProduct = (req, res) => {
    const payload = { id: parseInt(req.params.id) };
    /*
    gRPC method for reference:
    readProduct(ProductId) returns (Product)
    */
    gRPCClient_1.default.readProduct(payload, (err, result) => {
        if (err) {
            res.json('That product does not exist.');
        }
        else {
            res.json(result);
        }
    });
};
const createProduct = (req, res) => {
    const payload = { name: req.body.name, price: req.body.price };
    /*
    gRPC method for reference:
    createProduct(newProduct) returns (result)
    */
    gRPCClient_1.default.createProduct(payload, (err, result) => {
        res.json(result);
    });
};
const updateProduct = (req, res) => {
    const payload = { id: parseInt(req.params.id), name: req.body.name, price: req.body.price };
    /*
    gRPC method for reference:
    updateProduct(Product) returns (result)
    */
    gRPCClient_1.default.updateProduct(payload, (err, result) => {
        if (err) {
            res.json('That product does not exist.');
        }
        else {
            res.json(result);
        }
    });
};
const deleteProduct = (req, res) => {
    const payload = { id: parseInt(req.params.id) };
    /*
    gRPC method for reference:
    deleteProduct(ProductId) returns (result)
    */
    gRPCClient_1.default.deleteProduct(payload, (err, result) => {
        if (err) {
            res.json('That product does not exist.');
        }
        else {
            res.json(result);
        }
    });
};
exports.default = {
    listProducts,
    readProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
