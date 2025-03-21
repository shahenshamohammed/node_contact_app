const { Error } = require("mongoose");
const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
const getContact = asyncHandler(async (req, res) => {

    console.log(req.user);
    const getAll = await Contact.find({ user_id: req.user.id });

    res.status(200).json(getAll)

})

const creatOneContact = asyncHandler(async (req, res) => {
    console.log("req body is :", req.user.id);

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        console.log("helooo error ")

        res.status(400);

        throw new Error("All fields are mandatory")

    }

    const contacts = Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json(contacts)

})


const getOneContact = asyncHandler(async (req, res) => {


    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404)
        throw new Error("Contact not found");


    }
    res.status(200).json(contact)

})

const updateOneContact = asyncHandler(async (req, res) => {

    const update = await Contact.findById(req.params.id);
    if (!update) {
        res.status(404)
        throw new Error("Contact not found");
    }

    if (update.user_id.toString() !== req.user.id) {

        res.status(403);
        throw new Error("User dont have the permission to change the other user's contact")

    }
    const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updateContact)

})

const deleteOneContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found");
    }
    if (update.user_id.toString() !== req.user.id) {

        res.status(403);
        throw new Error("User dont have the permission to delete the other user's contact")

    }
    await contact.deleteOne()

    res.status(200).json(contact)

})

module.exports = { getContact, getOneContact, creatOneContact, updateOneContact, deleteOneContact }