import express, { Router } from 'express';
import * as controller from './db_controller.js';


const router = express.Router();


router.get('/', controller.getContacts);
router.post("/", controller.addContact);
router.get("/:id", controller.getContactsById);
router.put("/:id", controller.updateContact);
router.delete("/:id", controller.deleteContact);

export default router;

export const user = express.Router();

user.post('/', controller.addUser);
user.get('/', controller.getUsers);
user.get('/:name', controller.getUserByName);
user.delete('/:name', controller.deleteUser)