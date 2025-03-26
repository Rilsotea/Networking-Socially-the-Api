"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_js_1 = __importDefault(require("./config/connection.js"));
const index_js_1 = __importDefault(require("./routes/index.js"));
connection_js_1.default.once('open', () => {
    console.log('Connected to database');
});
connection_js_1.default.on('error', (err) => {
    console.log('Error connecting to database:', err);
});
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(index_js_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
