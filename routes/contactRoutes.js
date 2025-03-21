const express = require('express');
const router = express.Router();
const { getContact, getOneContact, creatOneContact, updateOneContact, deleteOneContact } = require('../src/controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');


router.use(validateToken)
router.route("/").get(getContact).post(creatOneContact)
router.route("/:id").get(getOneContact).put(updateOneContact).delete(deleteOneContact)



module.exports = router;