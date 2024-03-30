const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const {sendWelcomeEmail, sendExitEmail} = require('../emails/account');

const router = new express.Router();

router.get('/user/me', auth, async (req, res) => {
  res.send( req.user );
});

// Get all users
router.get('/users', async (req, res) => {
  const user = await User.find()
  res.send( user );
});

// Create User
router.post('/user', async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({user, token});
  } catch (e) {
    res.status(400).send(e);
  }
});

// Login User
router.post('/user/login', async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({user, token});
  } catch (Error) {
    res.status(400).send({Error: 'User not found'});
  }
});

// Logout User
router.post('/user/logout', auth, async (req, res) => {
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

// Logout user from all devices
router.post('/user/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();
    res.send({user: req.user.name, status: 'Logged out from all devices'});
  } catch (e) {
    res.status(500).send();
  }
});

// Update User info
router.patch('/user/me', auth, async (req, res) => {
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

// Delete the logged in user
router.delete('/user/me', auth, async (req, res) => {
  try {
    await req.user.remove();
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

// Upload image using multer
router.post('/user/me/avatar',
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

// Delete user Image
router.delete('/user/me/avatar', auth, async (req, res) => {
  if (!!req.user.avatar) {
    req.user.avatar = undefined;
    await req.user.save();
    res.send({Success: 'Avatar Delete Success'});
  } else {
    res.status(404).send({Success: 'Avatar Not Found'});
  }
}, (error, req, res, next) => {
  res.status(400).send({error: error.message});
});

// Retrieve User Image
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
