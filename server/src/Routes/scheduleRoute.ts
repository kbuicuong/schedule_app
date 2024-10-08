import express from 'express';

import {
  createSchedule,
  getSchedules,
  getSchedule,
  updateSchedule,
  deleteSchedule,
} from '../Controllers/scheduleController';

const router = express.Router();

router.get('/schedule', getSchedules);
router.post('/schedule/new', createSchedule);
router.get('/schedule/:id', getSchedule);
router.put('/schedule/update/:id', updateSchedule);
router.delete('/schedule/delete/:id', deleteSchedule);

export default router;
