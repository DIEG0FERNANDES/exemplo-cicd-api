"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongoDB = void 0;
const mongoose_1 = require("mongoose");
const connectToMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.connect)(`${process.env.DB_URL}`);
});
exports.connectToMongoDB = connectToMongoDB;
mongoose_1.connection.on('connecting', () => console.log('Opening connection to database...'));
mongoose_1.connection.on('connected', () => console.log(`App connected to db ${mongoose_1.connection.db.databaseName}`));
mongoose_1.connection.on('disconnecting', () => console.log('Closing connection to database...'));
mongoose_1.connection.on('disconnected', () => console.log(`App disconnected to db ${mongoose_1.connection.db.databaseName}`));
//# sourceMappingURL=db.js.map