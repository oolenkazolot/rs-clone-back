const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const router = Router();
const UserInfo = require('../models/UserInfo');
const User = require('../models/User');

// /api/user/create
router.post(
  '/create',
  [
    check('userId', 'Not selected userId').exists(),
    check('goal', 'Not selected goal').exists(),
    check('load', 'Not selected load').exists(),
    check('weight', 'Not specified weight').exists(),
    check('height', 'Not specified height').exists(),
    check('units', 'Not selected units').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid user data',
        });
      }
      const { id, goal, load, weight, height, units } = req.body;

      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(400).json({
          message: 'UserId does not exist',
        });
      }

      const userInfo = await UserInfo.findOne({ userId: id });

      if (!userInfo) {
        const userInfo = new UserInfo({ userId: id, goal, load, weight, height, units });
        await userInfo.save();
      } else {
        return res.status(400).json({
          message: 'User information already exists',
        });
      }
      return res.json({ message: 'Your data has been saved' });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong, please try again' });
    }
  }
);

// /api/user/get

router.get('/get/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const userInfo = await UserInfo.findOne({ userId: id });
    if (userInfo) {
      return res.json(userInfo);
    } else {
      return res.json({ message: 'user does not exist' });
    }
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

// /api/user/update

router.put('/update/:id', [check('weight', 'Not specified weight').exists(), check('height', 'Not specified height').exists()], async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid user data',
      });
    }
    const { id } = req.params;
    const { height, weight } = req.body;

    const userInfo = await UserInfo.findOne({ userId: id });

    if (!userInfo) {
      const user = new UserInfo({ userId: id, weight, height });
      await user.save();
    }
    userInfo.height = height;
    userInfo.weight = weight;
    await userInfo.save();

    return res.json({ message: 'Your data has been saved' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

module.exports = router;
