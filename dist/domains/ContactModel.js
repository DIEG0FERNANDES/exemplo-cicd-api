"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateContactInputs = exports.ContactModel = void 0;
const email_validator_1 = __importDefault(require("email-validator"));
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    birthday: { type: Date, required: true },
});
exports.ContactModel = (0, mongoose_1.model)('Contact', schema);
const validateContactInputs = (contactObj) => {
    const { name, email, phone, birthday } = contactObj;
    const errorMessages = [];
    if (!name) {
        errorMessages.push('Name cannot be empty');
    }
    if (!email_validator_1.default.validate(email)) {
        errorMessages.push('Invalid email');
    }
    // (99) 99999-9999
    if (!phone.match(/^\(\d{2}\)\s\d{5}-\d{4}$/)) {
        errorMessages.push('Phone must have following pattern: (00) 00000-0000');
    }
    // yyyy-mm-dd
    if (birthday.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const birthdayObj = new Date(birthday);
        if (birthdayObj >= new Date()) {
            errorMessages.push('Birthday must be previous to today');
        }
    }
    else {
        errorMessages.push('Invalid date format');
    }
    return errorMessages;
};
exports.validateContactInputs = validateContactInputs;
//# sourceMappingURL=ContactModel.js.map