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
exports.ContactController = void 0;
const ContactDAO_1 = require("../dao/ContactDAO");
const ContactModel_1 = require("../domains/ContactModel");
class ContactController {
    constructor() {
        this._contactDAO = new ContactDAO_1.ContactDAO();
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errorMessages = (0, ContactModel_1.validateContactInputs)(req.body);
            if (errorMessages.length == 0) {
                const { name, email, phone, birthday } = req.body;
                const contact = new ContactModel_1.ContactModel({
                    name,
                    email,
                    phone,
                    birthday: new Date(birthday),
                });
                const savedContact = yield this._contactDAO.save(contact);
                return res.status(201).json({ contact: savedContact });
            }
            return res.status(400).json({ errorMessages });
        });
    }
    findByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            const contacts = yield this._contactDAO.findByName(name);
            return res.status(200).json({ contacts });
        });
    }
    findByBirthdayPeriod(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { start, end } = req.query;
            const startDate = new Date(`${start}`);
            const endDate = new Date(`${end}`);
            const errorMessages = [];
            if (startDate <= endDate) {
                const contacts = yield this._contactDAO.findByBirthdayPeriod(startDate, endDate);
                return res.status(200).json({ contacts });
            }
            errorMessages.push('Start date cannot be greater than end date');
            return res.status(400).json({ errorMessages });
        });
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=ContactController.js.map