import express from 'express';
import gRPCClient from '../gRPCClient';

// handlers
const listProducts = (req:express.Request, res:express.Response) => {
  /*
  gRPC method for reference:
  listProducts(Empty) returns (ProductList)
  */
 gRPCClient.listProducts({}, (err:any, result:any) => {
    res.json(result);
  });
};
const readProduct = (req:express.Request, res:express.Response) => {
  const payload = { id: parseInt(req.params.id) };
  /*
  gRPC method for reference:
  readProduct(ProductId) returns (Product)
  */
 gRPCClient.readProduct(payload, (err:any, result:any) => {
    if (err) {
      res.json('That product does not exist.');
    } else {
      res.json(result);
    }
  });
};
const createProduct = (req:express.Request, res:express.Response) => {
  const payload = { name: req.body.name, price: req.body.price };
  /*
  gRPC method for reference:
  createProduct(newProduct) returns (result)
  */
 gRPCClient.createProduct(payload, (err:any, result:any) => {
    res.json(result);
  });
};
const updateProduct = (req:express.Request, res:express.Response) => {
  const payload = { id: parseInt(req.params.id), name: req.body.name, price: req.body.price };
  /*
  gRPC method for reference:
  updateProduct(Product) returns (result)
  */
 gRPCClient.updateProduct(payload, (err:any, result:any) => {
    if (err) {
      res.json('That product does not exist.');
    } else {
      res.json(result);
    }
  });
};
const deleteProduct = (req:express.Request, res:express.Response) => {
  const payload = { id: parseInt(req.params.id) };
  /*
  gRPC method for reference:
  deleteProduct(ProductId) returns (result)
  */
 gRPCClient.deleteProduct(payload, (err:any, result:any) => {
    if (err) {
      res.json('That product does not exist.');
    } else {
      res.json(result);
    }
  });
};

export default {
  listProducts,
  readProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
