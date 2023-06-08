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
exports.ContactDAO = void 0;
const ContactModel_1 = require("../domains/ContactModel");
class ContactDAO {
    save(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedContact = yield ContactModel_1.ContactModel.create(contact);
            return savedContact;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const contacts = yield ContactModel_1.ContactModel.find({
                name: {
                    $regex: name,
                    $options: 'i',
                },
            });
            return contacts;
        });
    }
    findByBirthdayPeriod(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const contacts = yield ContactModel_1.ContactModel.find({
                birthday: {
                    $gte: start,
                    $lte: end,
                },
            });
            return contacts;
        });
    }
}
exports.ContactDAO = ContactDAO;
//# sourceMappingURL=ContactDAO.js.map