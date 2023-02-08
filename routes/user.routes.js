const UserInfo = require('../models/UserInfo');
const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const router = Router();

// /api/user/update
router.post(
  '/update',
  [
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

      const candidate = await UserInfo.findOne({ userId: id });

      if (!candidate) {
        const user = new UserInfo({ userId: id, goal, load, weight, height, units });
        await user.save();
        return res.json({ message: 'Your data has been saved' });
      } else {
        //перезаписать
      }
    } catch (e) {
      //console.log(e);
      res.status(500).json({ message: 'Something went wrong, please try again' });
    }
  }
);

module.exports = router;
