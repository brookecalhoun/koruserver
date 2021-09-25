const router = require("express").Router();
const db = require("../models");

router.get("/", (req, res) => {
  db.Journal.find({}, (err, foundJournal) => {
    console.log("hello from get");

    console.log(foundJournal);

    if (err) return console.log(err);

    res.json(foundJournal);
  });
});

router.get("/:id", (req, res) => {
  db.Journal.findById(req.params.id, (err, foundJournal) => {
    console.log("hello from one journal");
    if (err) return console.log(err);

    res.json(foundJournal);
  });
});

router.post("/", (req, res) => {
  db.Journal.create(req.body, (err, savedJournal) => {
    console.log("hello from post");
    if (err) return console.log(err);

    res.json(savedJournal);
  });
});

router.put("/:id", (req, res) => {
  db.Journal.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedJournal) => {
      if (err) return console.log(err);

      res.json(updatedJournal);
    }
  );
});

router.delete("/:id", (req, res) => {
  console.log("delete route");
  db.Journal.findByIdAndDelete(req.params.id, (err, deletedJournal) => {
    if (err) return console.log(err);
    res.json({ messaage: "Successful deletion" });
  });
});

module.exports = router;
