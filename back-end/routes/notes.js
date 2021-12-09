const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Note = require("../Models/NotesSchema");
const fetchUser = require("../middleware/fetchUser");

router.get("/", fetchUser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.send(notes);
});

router.post("/addnote",
  [
    body("description", "Discription can't be left empty.").isLength({
      min: 1,
    }),
  ],
  fetchUser,
  async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let note = await Note.create({
        user: req.user.id,
        title,
        description,
        tag,
      });
      res.json(note);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

router.put("/updatenote/:id",
  [
    body("description", "Discription can't be left empty.").isLength({
      min: 1,
    }),
  ],
  fetchUser,
  async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let updatednote = { title: "", description: "", tag: "" };
      if (title) { updatednote.title = title }
      if (description) { updatednote.description = description }
      if (tag) { updatednote.tag = tag }

      let note = await Note.findById(req.params.id)
      if (!note) { return res.status(404).send("Not Found") }
      if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }

      note = await Note.findByIdAndUpdate(req.params.id, { $set: updatednote }, { new: true })
      res.json(note);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
);

router.delete("/deletenote/:id", fetchUser, async (req, res) => {

  const { title, description, tag } = req.body;
  try {
    let note = await Note.findById(req.params.id)
    if (!note) { return res.status(404).send("Not Found") }
    if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json("Seccess : Note is deleted.");
  } catch (error) {
    res.status(500).json(error.message);
  }
}
);

module.exports = router;