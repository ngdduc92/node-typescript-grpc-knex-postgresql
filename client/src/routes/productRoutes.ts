// requirements
import express from 'express';
import grpcRoutes from './grpcRoutes';

// new router
const router = express.Router();

// routes
router.get('/v1/products', grpcRoutes.listProducts);
router.get('/v1/products/:id', grpcRoutes.readProduct);
router.post('/v1/products', grpcRoutes.createProduct);
router.put('/v1/products/:id', grpcRoutes.updateProduct);
router.delete('/v1/products/:id', grpcRoutes.deleteProduct);

export default router;
