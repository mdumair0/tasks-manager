const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const {sendWelcomeEmail, sendExitEmail} = require('../emails/account');

const router = new express.Router();

router.get('/users/me', auth, async (req, res) => {
  res.send( req.user );
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthToken();
    sendWelcomeEmail(user.email, user.name);
    await user.save();
    res.status(201).send({user, token});
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/users/login', async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({user, token});
  } catch (Error) {
    res.status(400).send({Error: 'User not found'});
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send({user: req.user.name, status: 'Logged Out'});
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();
    res.send({user: req.user.name, status: 'Logged out from all devices'});
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ['name', 'email', 'password', 'age'];
  const isValidOp = updates.every((update) => allowed.includes( update ));
  if (!isValidOp) return res.status(400).send({error: 'Invalid Update !!'});
  try {
    const user = req.user;
    updates.forEach((update) => user[update] = req.body[update]);
    user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    sendExitEmail(req.user.email, req.user.name);
    res.send( req.user );
  } catch (e) {
    res.status(500).send(e);
  }
});

const upload = multer({
  limits: {
    fileSize: 3000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|ts)$/)) {
      return cb(new Error('Please Upload an Image'));
    }
    cb(undefined, true);
  },
});

router.post('/users/me/avatar',
    auth,
    upload.single('avatar'), async (req, res) => {
      const buffer = await sharp(req.file.buffer)
          .resize({width: 250, height: 250})
          .png()
          .toBuffer();
      req.user.avatar = buffer;
      await req.user.save();
      res.send({Success: 'Avatar Upload Success'});
    }, (error, req, res, next) => {
      res.status(400).send({error: error.message});
    },
);

router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send({Success: 'Avatar Delete Success'});
}, (error, req, res, next) => {
  res.status(400).send({error: error.message});
});

router.get('/user/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) throw new Error();

    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
