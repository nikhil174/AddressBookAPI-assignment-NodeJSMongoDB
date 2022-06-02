const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");
const User = require("../models/userModel");

// @desc        Get all contact with Pagination
// @route       GET /api/contact/all?page=__,limit=__
// @access      Private
const getAllContacts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 4;

  const skip = (page - 1) * limit;

  let contacts = await Contact.find({ user: req.user.id })
    .skip(skip)
    .limit(limit);

  res.status(200).json(contacts);
});

// @desc          Get single contact
// @route         GET /api/contact/:id
// @access        Private
const getSingleContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the goal user
  if (contact.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json(contact);
});

// @desc          create a new Contact
// @route         POST /api/contact
// @access        Private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone || !address) {
    res.status(400);
    throw new Error("Please add all the fields");
  }

  const exist = await Contact.findOne({ email });

  if (exist) {
    res.status(400);
    throw new Error("Email already exist");
  }

  const contact = await Contact.create({
    user: req.user.id,
    name,
    email,
    phone,
    address,
  });

  res.status(200).json(contact);
});

//@desc       create bulk contacts
//@route      POST /api/contact/many
//@access     Private
const createManyContacts = asyncHandler(async (req, res) => {
  const manyContact = req.body;

  const updatedContact = manyContact.map((contact) => {
    const { name, phone, email, address } = contact;
    if (!name || !phone || !email || !address) {
      res.status(400);
      throw new Error("Please add all the filds");
    } else {
      return {
        name,
        phone,
        email,
        address,
        user: req.user.id,
      };
    }
  });

  const insertedContact = await Contact.insertMany(updatedContact);

  res.status(201).json(insertedContact);
});

// @desc        Update Contact
// @route       PUT /api/contact/:id
// @access      Private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the goal user
  if (contact.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedContact);
});

// @desc          Delete contact
// @route         DELETE /api/contact/:id
// @access        Private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the goal user
  if (contact.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await contact.remove();

  res.status(200).json({ message: "Contact deleted", id: req.params.id });
});

//@desc         search by name
//@route        GET  /api/contact?name=name
//@access       private
const searchContact = asyncHandler(async (req, res) => {
  const name = req.query.name;

  const contacts = await Contact.find({
    name,
  });

  res.status(200).json(contacts);
});

module.exports = {
  createContact,
  getAllContacts,
  deleteContact,
  getSingleContact,
  updateContact,
  searchContact,
  createManyContacts,
};
