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
      return res.json(complex);
    } else {
      return res.status(400).json({
        message: 'UserId does not exist',
      });
    }
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

// /api/complex/get-all/
//получить все комплексы
//в пути указываем userId
router.get('/get-all/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const complexes = await Complex.find({ userId: id });
    if (complexes) {
      return res.json(complexes);
    } else {
      return res.status(400).json({
        message: 'Сomplexes does not exist',
      });
    }
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

// /api/complex/get/
//получить один комплекс
//в пути указываем уникальный idComplex
router.get('/get/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const complex = await Complex.find({ _id: id });
    if (complex) {
      return res.json(complex);
    } else {
      return res.status(400).json({
        message: 'Сomplex does not exist',
      });
    }
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

// /api/complex/delete/
// удалить комплекс
// передаётся idComplex уникальный
// возвращается удаленный комплекс

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Complex.findOneAndDelete({ _id: id });
    if (result) {
      res.json({ massage: 'Complex removed' });
    } else {
      return res.status(400).json({
        message: 'Сomplex does not exist',
      });
    }
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

module.exports = router;
