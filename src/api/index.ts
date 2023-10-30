import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import reportsRoute from './reportsRoute';
import reportsStudents from './reportsStudents';
import reportsFrenquecy from './reportsFrequency';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - Relatórios',
  });
});

router.use('/relatorios-rotas', reportsRoute);
router.use('/relatorios-alunos', reportsStudents);
router.use('/relatorios-frequencias', reportsFrenquecy);

export default router;
