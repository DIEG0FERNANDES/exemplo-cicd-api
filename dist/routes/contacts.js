"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactsRouter = void 0;
const express_1 = require("express");
const ContactController_1 = require("../controllers/ContactController");
exports.contactsRouter = (0, express_1.Router)();
const contactCtrl = new ContactController_1.ContactController();
/**
 * O código abaixo pode apresentar problema de
 * binding (ligação/clonagem de funções), pois é
 * feita apenas uma cópia do método save, sem a
 * cópia completa do objeto contactCtrl:
 *
 * contactsRouter.post('/', contactCtrl.save)
 *
 * Para resolver este problema, alterei o código
 * acima para este código que está em execução.
 * Alternativamente, é possível realizar o binding
 * explícito do objeto contactCtrl:
 * contactsRouter.post('/', contactCtrl.save.bind(contactCtrl))
 */
exports.contactsRouter.post('/', (req, res) => contactCtrl.save(req, res));
exports.contactsRouter.get('/name/:name', (req, res) => contactCtrl.findByName(req, res));
exports.contactsRouter.get('/birthday', (req, res) => contactCtrl.findByBirthdayPeriod(req, res));
//# sourceMappingURL=contacts.js.map