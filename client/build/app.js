"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// requirements
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
// express
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// routes
app.use('/api', productRoutes_1.default);
// run server
app.listen(4000, () => {
    console.log('Server listing on port 4000');
});
