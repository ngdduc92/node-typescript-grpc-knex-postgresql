"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// requirements
const express_1 = __importDefault(require("express"));
const grpcRoutes_1 = __importDefault(require("./grpcRoutes"));
// new router
const router = express_1.default.Router();
// routes
router.get('/v1/products', grpcRoutes_1.default.listProducts);
router.get('/v1/products/:id', grpcRoutes_1.default.readProduct);
router.post('/v1/products', grpcRoutes_1.default.createProduct);
router.put('/v1/products/:id', grpcRoutes_1.default.updateProduct);
router.delete('/v1/products/:id', grpcRoutes_1.default.deleteProduct);
exports.default = router;
