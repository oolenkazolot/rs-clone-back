const Complex = require('../models/Complex');
const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const router = Router();

// /api/exercise/create

router.post(
  '/create',
  [check('idComplex', 'Not specified complex id').exists(), check('idExercise', 'Not specified exercise id').exists(), check('count', 'Not specified count').exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid exercise data',
        });
      }

      const { idComplex, idExercise, count } = req.body;

      const complex = await Complex.findOne({ _id: idComplex });

      if (complex) {
        const exercise = new Exercise({ idComplex, idExercise, count });
        await exercise.save();
        return res.json(exercise);
      } else {
        return res.status(400).json({
          message: 'Complex does not exist',
        });
      }
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong, please try again' });
    }
  }
);

// /api/exercise/get/
//получить все упражнения для комплекса
//передаётся id комплекса
router.get('/get/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const exercises = await Exercise.find({ idComplex: id });
    if (exercises) {
      return res.json(exercises);
    } else {
      return res.status(400).json({
        message: 'Exercises not found, id complex not found',
      });
    }
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

// /api/exercise/delete/
// удалить упражнение
// передаётся idExercise уникальный как в базе _id
// возвращается удаленноe упражнение

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Exercise.findOneAndDelete({ _id: id });
    if (result) {
      res.json({ massage: 'Exercise removed' });
    } else {
      return res.status(400).json({
        message: 'Exercise does not exist',
      });
    }
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

module.exports = router;
