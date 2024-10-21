import express from "express";

import {createConfig, deleteConfig, getConfig, updateConfig} from '../Controllers/configController';

const router = express.Router();

router.post('/config/new', createConfig);
router.get('/config', getConfig);
router.put('/config/update/:id', updateConfig);
router.delete('/config/delete/:id', deleteConfig);

export default router;
