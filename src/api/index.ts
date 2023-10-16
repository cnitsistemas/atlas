import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import reportsRoute from './reportsRoute';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - Relatórios',
  });
});

router.use('/relatorios-rotas', reportsRoute);

export default router;
