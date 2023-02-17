const Complex = require('../models/Complex');
const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/complex/create
router.post('/create', [check('name', 'Complex name not specified').exists(), check('userId', 'Missing userId').exists()], async (req, res) => {
  try {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid data complex',
      });
    }
    const { userId, name } = req.body;

    const user = await User.findOne({ _id: userId });

    if (user) {
      const complex = new Complex({ userId, name });
      await complex.save();
    } else {
      return res.status(400).json({
        message: 'UserId does not exist',
      });
    }
    return res.json({ message: 'Your data has been saved' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

module.exports = router;
