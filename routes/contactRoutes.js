const express = require("express");
const router = express.Router();

const {
  createContact,
  getAllContacts,
  deleteContact,
  getSingleContact,
  updateContact,
  searchContact,
  createManyContacts,
} = require("../controllers/contactController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, searchContact);
router.post("/", protect, createContact);
router.post("/many", protect, createManyContacts);
router.get("/all", protect, getAllContacts);
router.get("/:id", protect, getSingleContact);
router.delete("/:id", protect, deleteContact);
router.put("/:id", protect, updateContact);

module.exports = router;
