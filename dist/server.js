"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_flow_1 = __importDefault(require("dotenv-flow"));
dotenv_flow_1.default.config();
const mongoose_1 = require("mongoose");
const app_1 = require("./app");
const PORT = process.env.PORT || 3000;
const server = app_1.app.listen(PORT, () => console.log(`App running on port ${PORT}`));
const events = [
    'exit',
    'SIGINT',
    'SIGUSR1',
    'SIGUSR2',
    //'uncaughtException',
    'SIGTERM',
];
events.forEach((e) => {
    process.on(e, () => {
        server.close();
        mongoose_1.connection.close();
    });
});
//# sourceMappingURL=server.js.map