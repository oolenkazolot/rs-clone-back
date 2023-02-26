const UserInfo = require('../models/UserInfo');
const Completed = require('../models/Completed');
const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();
const moment = require('moment'); // require

// /api/completed/create
// передаётся userId, уникальный id выполненного комплекса (если не user создавал complex, то id complex из json файла, ), time число в минутах
router.post('/create', [check('userId', 'Missing userId').exists(), check('idComplex', 'Missing idComplex').exists(), check('time', 'Missing time').exists()], async (req, res) => {
  try {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid data completed',
      });
    }
    const { userId, idComplex, time } = req.body;

    const user = await User.findOne({ _id: userId });

    if (user) {
      const completed = new Completed({ userId, idComplex, date: new Date('2023-02-27'), time });
      await completed.save();
      return res.json(completed);
    } else {
      return res.status(400).json({
        message: 'UserId does not exist',
      });
    }
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

// /api/completed/get-all/:id

//получить количество выполненных complexes и общее время, затраченное на выполненные комплексы
//в пути указываем userId
router.get('/get-all/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const completed = await Completed.find({ userId: id });
    const resultData = {
      totalCompletedComplexes: 0,
      totalTime: 0,
    };
    if (completed) {
      resultData.totalCompletedComplexes = completed.length;
      resultData.totalTime = calcTotalTime(completed);
    }
    return res.json(resultData);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

function calcTotalTime(completed) {
  const totalTime = {
    hours: 0,
    minutes: 0,
  };
  const totalTimeMinutes = completed.reduce((acc, complex) => {
    return (acc += complex.time);
  }, 0);
  if (totalTimeMinutes < 60) {
    totalTime.minutes = totalTimeMinutes;
  } else {
    totalTime.hours = Math.floor(totalTimeMinutes / 60);
    totalTime.minutes = totalTimeMinutes % 60;
  }
  return totalTime;
}

// /api/completed/weekly-workouts/:id

//получить количество выполненных complexes и общее время, затраченное на выполненные комплексы
//в пути указываем userId
router.get('/weekly-workouts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const completed = await Completed.find({
      userId: id,
      date: {
        $gt: moment().startOf('isoWeek'),
        $lt: moment().endOf('isoWeek'),
      },
    });

    const userInfo = await UserInfo.findOne({ userId: id });

    const resultData = {
      weeklyWorkouts: [],
      goal: '0',
    };

    if (userInfo) {
      resultData.goal = userInfo.goal;
    }

    if (completed) {
      resultData.weeklyWorkouts = getWeeklyWorkouts(completed);
    }
    return res.json(resultData);
  } catch (e) {
    res.json({ message: 'Something went wrong, please try again' });
  }
});

function getWeeklyWorkouts(completed) {
  let setWeeklyWorkouts = new Set();
  completed.forEach((completedComplex) => {
    const numberDate = moment(completedComplex.date).isoWeekday();
    setWeeklyWorkouts.add(numberDate);
  });
  return [...setWeeklyWorkouts].sort();
}

module.exports = router;
