const express = require('express');
const _ = require('lodash');
const { Art, validateArt, genArtNumber } = require('../models/art');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/user-gallery', auth, async (req, res) => {
  if (!req.user.artist)
    return res.status(401).send('Only artists can access this page');
  const arts = await Art.find({ creator_id: req.user._id });
  res.send(arts);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validateArt(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let art = await Art.findOneAndUpdate(
    { _id: req.params.id, creator_id: req.user._id },
    req.body
  );
  if (!art) return res.status(404).send('Work of art does not exist');
  art = await Art.findOne({ _id: req.params.id, creator_id: req.user._id });
  res.send(art);
});

router.get('/public', async (req, res) => {
  const art = await Art.find({ public: true });
  res.send(art);
});

router.delete('/:id', auth, async (req, res) => {
  let art = await Art.findOneAndDelete(
    { _id: req.params.id, creator_id: req.user._id },
    req.body
  );
  art = await Art.findOne({ _id: req.params.id, creator_id: req.user._id });
  res.send(art);
});

router.get('/:id', auth, async (req, res) => {
  const art = await Art.findOne({
    _id: req.params.id,
    creator_id: req.user._id,
  });
  if (!art) return res.status(404).send('Work of art does not exist');
  res.send(art);
});

router.post('/', auth, async (req, res) => {
  const { creator, artName, artDescription, artImage, public } = req.body;
  if (!req.user.artist)
    return res.status(401).send('Only Artists Can Publish Their Art!');
  const { error } = validateArt(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let art = new Art({
    creator: creator,
    artName: artName,
    artDescription: artDescription,
    artImage: artImage,
    public: public,
    artNumber: await genArtNumber(Art),
    creator_id: req.user._id,
  });
  art = await art.save();
  res.send(art);
});

module.exports = router;
